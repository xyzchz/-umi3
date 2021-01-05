import request from 'umi-request';

export const getUserList = async () => {
  const data = await request.get('api/user');
  return data;
};

export const patchUser = async (params) => {
  const data = await request.patch('api/user', { data: params });
  return data;
};

// http://127.0.0.1:7002
