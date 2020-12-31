import React from 'react'
import styles from './index.less'
import { history } from 'umi'

export default () => {
  const toUsers = () => history.push('/users')

  return (
    <div>
      <h3 className='theme_color'>主页</h3>
      <input type='button' onClick={toUsers} value='用户列表' />
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
