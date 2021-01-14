import { extend } from 'umi-request';
import { message } from 'antd';

const errorHandler = function (error) {
  const codeMap = {
    '401': '服务器错误',
    '022': '发生大大大大错误啦',
  };
  if (error.response) {
    // 请求已发送但服务端返回状态码非 2xx 的响应
    // console.log(JSON.parse(JSON.stringify(error)));
    const status = error.response.status.toString();
    if (codeMap[status]) {
      message.error(codeMap[status]);
    } else {
      message.error('发生错误');
    }
  } else {
    // 请求初始化时出错或者没有响应返回的异常
    console.log('network error'); // 没返回只能显示网络异常了
  }

  // throw error; // 如果throw. 错误将继续抛出.

  // 如果return, 则将值作为返回. 'return;' 相当于return undefined, 在处理结果时判断response是否有值即可.
  return;
};

const request = extend({
  prefix: '/api/v1',
  timeout: 1000,
  errorHandler,
});

request.interceptors.response.use(async (response, options) => {
  const data = await response.clone().json();
  console.log(data);
  return response;
});

export const getUserList = async (params) => {
  const data = await request.get('/user', { params });
  return data;
};

export const patchUser = async (params) => {
  const data = await request.patch('/user', { data: params });
  return data;
};

export const postUser = async (params) => {
  const data = await request.post('/user', { data: params });
  return data;
};

export const getErrorTest = async (params) => {
  const data = await request.get('/errorTest');
  return data;
};

// http://127.0.0.1:7002
