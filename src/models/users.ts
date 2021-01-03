import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getUserList } from '@/service/serviceApi';

interface UserModelType {
  namespace: 'users';
  state: {};
  reducers: {
    getList: Reducer;
  };
  effects: {
    getRemote: Effect;
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
  },
  reducers: {
    getList(state, action) {
      return { state, list: action.payload };
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
          });
        }
      });
    },
  },
};
export default UserModel;
