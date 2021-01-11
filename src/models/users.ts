import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getUserList, patchUser, postUser } from '@/service/serviceApi';

interface UserModelType {
  namespace: 'users';
  state: {};
  reducers: {
    getList: Reducer;
    editUser: Reducer;
  };
  effects: {
    getRemote: Effect;
    edit: Effect;
    add: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserModel: UserModelType = {
  namespace: 'users',
  state: {},
  effects: {
    *getRemote(action, { put, call }) {
      const data = yield call(getUserList);
      yield put({
        type: 'getList',
        payload: data,
      });
    },
    *edit(action, { put, call }) {
      const data = yield call(patchUser, action.payload);
      yield put({
        type: 'editUser',
        payload: data,
      });
      return data;
    },
    *add(action, { put, call }) {
      const data = yield call(postUser, action.payload);
      yield put({
        type: 'getRemote',
      });
      return data;
    },
  },
  reducers: {
    getList(state, action) {
      return { state, list: action.payload };
    },
    editUser(state, action) {
      const { payload } = action;
      const { list } = state;
      const index = list.findIndex((item) => item.userId === payload.userId);
      // if (index === -1) return
      if (!list[index]) return;
      return {
        ...state,
        list: [
          ...list.slice(0, index),
          { ...list[index], ...payload },
          ...list.slice(index + 1),
        ],
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location, action) => {
        if (location.pathname === '/users') {
          // dispatch({
          //   type: 'getRemote',
          // });
        }
      });
    },
  },
};
export default UserModel;
