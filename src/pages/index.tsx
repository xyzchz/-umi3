import React from 'react';
import styles from './index.less';
import { history } from 'umi';

export default () => {
  const toUsers = () => history.push('/users');

  const toMain = () => history.push('/main');

  return (
    <div>
      <h3 className="theme_color">主页</h3>
      <input type="button" onClick={toUsers} value="用户列表" />
      <input type="button" onClick={toMain} value="临时主页" />
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
};
