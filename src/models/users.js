import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

const IndexModel = {
  namespace: 'users',
  state: {
    users: []
  },
  effects: {
    *query({ payload }, { call, put }) {
    },
  },
  reducers: {
    save(state, action) {
      const data = [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ];
      return data;
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'save',
          })
        }
      });
    }
  }
};
export default IndexModel;