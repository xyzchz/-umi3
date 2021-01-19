import React, { useState, useEffect } from 'react';
import CSSModules from 'react-css-modules';
import { history } from 'umi';
import styles from './index.less';
import bg1 from '@/asset/img/sky1.jpg';
import img from '@/asset/img/Frame 2.png';

type ReactEle = {
  styleName: string;
};

const Index = () => {
  const [left, setLeft] = useState(0);

  const [active, setActive] = useState(-1);

  const [firstImg, setFirstImg] = useState('img-1');

  const [secImg, setSecImg] = useState('img0');

  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    setIsOver(false);
    window.location.href = `#img${active}`;
  }, [firstImg, secImg]);

  const selectOn = (e) => {
    const id = Number(e.currentTarget.getAttribute('id'));
    setTimeout(() => {
      setActive(id);
      const oldImgName = `img${active}`;
      if (oldImgName === firstImg) {
        setSecImg(`img${id}`);
      } else {
        setFirstImg(`img${id}`);
      }
    }, 500);
    if (id > 1) return setLeft((id - 1) * 222);
    setLeft(0);
  };

  const resetLeft = () => {
    setLeft(0);
  };

  return (
    <div styleName="title">
      <img
        id={secImg}
        styleName={secImg === `img${active}` ? 'bg zoomIn' : 'bg'}
        src={img}
        alt="错误"
      />
      <img
        id={firstImg}
        styleName={firstImg === `img${active}` ? 'bg zoomIn' : 'bg'}
        src={bg1}
        alt="错误"
      />
      <div
        styleName={isOver ? 'container over' : 'container'}
        onMouseOver={() => {
          setIsOver(true);
        }}
        onMouseLeave={resetLeft}
      >
        <div styleName="outShadowContainer">
          <div styleName="outShadow" />
        </div>
        <div styleName="longTabsContainer">
          <div styleName="longTabs" style={{ marginLeft: `-${left}px` }}>
            <div styleName="shadow" />
            <img id="0" onClick={selectOn} src={img} alt="错误" />
            <img id="1" onClick={selectOn} src={img} alt="错误" />
            <img id="2" onClick={selectOn} src={img} alt="错误" />
            <img id="3" onClick={selectOn} src={img} alt="错误" />
            <img id="4" onClick={selectOn} src={img} alt="错误" />
            <img id="5" onClick={selectOn} src={img} alt="错误" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSModules(styles, { allowMultiple: true })(Index);
