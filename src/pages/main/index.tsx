import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import img from '@/asset/img/Frame 2.png';

const Index = () => {
  return (
    <div styleName="title">
      <img src={img} alt="错误" />
    </div>
  );
};

export default CSSModules(Index, styles);
