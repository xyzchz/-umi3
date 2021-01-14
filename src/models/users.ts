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
  state: {
    pageInfo: {
      total: 0,
      page: 1,
      pageSize: 10,
    },
  },
  effects: {
    *getRemote(action, { put, call }) {
      const data = yield call(getUserList, action.payload);
      yield put({
        type: 'getList',
        payload: data || [],
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
      const { items } = action.payload;
      if (!items || items.length === 0) return state;
      return { ...state, ...action.payload };
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
          dispatch({
            type: 'getRemote',
            payload: {
              offset: 0,
              limit: 10,
            },
          });
        }
      });
    },
  },
};
export default UserModel;
