import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/users', component: '@/pages/users' },
    { path: '/main', component: '@/pages/main' },
  ],
});
