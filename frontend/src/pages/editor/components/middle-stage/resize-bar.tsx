import {
  Slider, Select,
} from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import {
  fromEvent, interval, throttle,
} from 'rxjs';

import { useRuler } from '../../hooks';

import { useStageScale } from '../../hooks/use-stage-scale';

import { MiddleStageContext } from './middle-stage-context';

import { toFixed } from '@/utils';

interface IResizeBarProps {

}

export const MIN_SCALE = 25;
export const MAX_SCALE = 400;

const ScaleOptions: DefaultOptionType[] = [
  {
    label: '25%', value: 25,
  },
  {
    label: '50%', value: 50,
  },
  {
    label: '100%', value: 100,
  },
  {
    label: '150%', value: 150,
  },
  {
    label: '200%', value: 200,
  },
  {
    label: '300%', value: 300,
  },
  {
    label: '400%', value: 400,
  },
  {
    label: '自适应', value: -1,
  },
];

export const ResizeBar: React.FC<IResizeBarProps> = function ResizeBar() {
  const [scale, setScale] = useState(100);
  const {
    updateScale, updateOrigin,
  } = useRuler();

  const [, setScaleCenter] = useStageScale();

  const middleStageRef = useContext(MiddleStageContext);

  const hanldeUpdateScale = useCallback((s: number) => {
    if (s < 0) {
      // TODO: 设置画布自适应
      return;
    }
    setScale(s);
    updateScale(toFixed(s / 100, 3));
  }, [updateScale]);

  useEffect(() => {
    if (!middleStageRef?.current) return () => {};

    const subscription = fromEvent(middleStageRef.current, 'wheel')
      .pipe(throttle(() => interval(300)))
      .subscribe((evt: Event) => {
        if (evt instanceof WheelEvent) {
          // 控制缩放倍数
          const newScale = Math.max(Math.min(scale + evt.deltaY, MAX_SCALE), MIN_SCALE);
          setScaleCenter({
            x: evt.offsetX, y: evt.offsetY,
          });
          // const oX = origin.x;
          // const oY = origin.y;

          // const orginOffsetX = evt.offsetX - oX;
          // const originOffsetY = evt.offsetY - oY;

          // const scaledX = orginOffsetX * ((newScale / 100) / (scale / 100));
          // const scaledY = originOffsetY * ((newScale / 100) / (scale / 100));

          // const newX = toFixed(evt.offsetX - scaledX, 3);
          // // const newY = oY + ((evt.offsetY - oY) * (newScale / 100 - 1));
          // const newY = toFixed(evt.offsetY - scaledY, 3);
          // console.log(evt.offsetX);
          // console.log({
          //   deltaY: evt.deltaY, offsetX: evt.offsetX, oY, originOffsetY, scaledY, newY,
          // });
          // updateOrigin({
          //   x: newX, y: newY,
          // });
          // TODO: 已鼠标所在位置为中心进行缩放
          hanldeUpdateScale(newScale);
        }
        evt.preventDefault();
      });
    return () => subscription.unsubscribe();
  }, [hanldeUpdateScale, middleStageRef, scale, setScaleCenter, updateOrigin]);

  // useEffect(() => {
  //   const $stage = document.getElementById('pan-stage');
  //   if (!$stage) return;
  //   const {
  //     left: originX, top: originY,
  //   } = $stage.getBoundingClientRect();

  //   const orginOffsetX = mouseOffset.x - originX;
  //   const originOffsetY = mouseOffset.y - originY;

  //   const scaledX = orginOffsetX * ((scale / 100) / (preScale / 100));
  //   const scaledY = originOffsetY * ((scale / 100) / (preScale / 100));

  //   const newX = toFixed(mouseOffset.x - scaledX, 3);
  //   // const newY = oY + ((evt.offsetY - oY) * (newScale / 100 - 1));
  //   const newY = toFixed(mouseOffset.y - scaledY, 3);

  //   updateOrigin({
  //     x: newX, y: newY,
  //   });
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [scale, preScale, mouseOffset, updateOrigin]);

  return (
    <div
      className="absolute flex right-4 bottom-4 w-80 p-bg-l shadow-md shadow-black items-center justify-center p-1"
    >
      <Select
        className="w-20 mr-2"
        size="small"
        defaultValue={-1}
        options={ScaleOptions}
        onChange={hanldeUpdateScale}
      />
      <Slider
        className="grow"
        onChange={hanldeUpdateScale}
        min={MIN_SCALE}
        max={MAX_SCALE}
        step={1}
        value={scale}
        tooltip={{ formatter(value?: number) { return `${(value ?? 1)}%`; } }}
      />
    </div>
  );
};
