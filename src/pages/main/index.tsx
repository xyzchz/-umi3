import React, { useState } from 'react';
import CSSModules from 'react-css-modules';
import { history } from 'umi';
import styles from './index.less';
import bg1 from '@/asset/img/sky1.jpg';
import img from '@/asset/img/Frame 2.png';

const Index = () => {
  const [left, setLeft] = useState(0);

  const [active, setActive] = useState(-1);

  const [firstImg, setFirstImg] = useState('img-1');

  const [secImg, setSecImg] = useState('img0');

  const [isOver, setIsOver] = useState(false);

  const selectOn = (e) => {
    const id = Number(e.currentTarget.getAttribute('id'));
    setTimeout(() => {
      setActive(id);
      setIsOver(false);
      window.location.href = '#img0';
    }, 500);
    if (id > 1) return setLeft((id - 1) * 272);
    setLeft(0);
  };

  const resetLeft = () => {
    setLeft(0);
  };

  return (
    <div styleName="title">
      <img styleName="bg" id={secImg} src={img} alt="错误" />
      <img styleName="bg" id={firstImg} src={bg1} alt="错误" />
      <div
        styleName={isOver ? 'container over' : 'container'}
        onMouseOver={() => {
          setIsOver(true);
        }}
        onMouseLeave={resetLeft}
      >
        <div styleName="longTabs" style={{ marginLeft: `-${left}px` }}>
          <div styleName="shadow" />
          <img
            id="0"
            styleName={active === 0 ? 'active' : ''}
            onClick={selectOn}
            src={img}
            alt="错误"
          />
          <img
            id="1"
            styleName={active === 1 ? 'active' : ''}
            onClick={selectOn}
            src={img}
            alt="错误"
          />
          <img
            id="2"
            styleName={active === 2 ? 'active' : ''}
            onClick={selectOn}
            src={img}
            alt="错误"
          />
          <img
            id="3"
            styleName={active === 3 ? 'active' : ''}
            onClick={selectOn}
            src={img}
            alt="错误"
          />
          <img
            id="4"
            styleName={active === 4 ? 'active' : ''}
            onClick={selectOn}
            src={img}
            alt="错误"
          />
          <img
            id="5"
            styleName={active === 5 ? 'active' : ''}
            onClick={selectOn}
            src={img}
            alt="错误"
          />
        </div>
      </div>
    </div>
  );
};

export default CSSModules(styles, { allowMultiple: true })(Index);
