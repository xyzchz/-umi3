import request from 'umi-request';

export const getUserList = async () => {
  const data = await request.get('api/user');
  return data;
};

// http://127.0.0.1:7002
