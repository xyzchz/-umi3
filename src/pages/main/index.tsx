import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.less';
import img from '@/asset/img/Frame 2.png';

const Index = () => {
  return (
    <div styleName="title">
      <div styleName="container">
        <div styleName="longTabs">
          <div styleName="shadow" />
          <img src={img} alt="错误" />
          <img src={img} alt="错误" />
          <img src={img} alt="错误" />
          <img src={img} alt="错误" />
          <img src={img} alt="错误" />
          <img src={img} alt="错误" />
        </div>
      </div>
    </div>
  );
};

export default CSSModules(Index, styles);
