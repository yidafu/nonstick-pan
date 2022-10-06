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

import { MiddleStageContext } from './middle-stage-context';

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
  const { updateScale } = useRuler();
  const middleStageRef = useContext(MiddleStageContext);

  const hanldeUpdateScale = useCallback((s: number) => {
    if (s < 0) {
      // TODO: 设置画布自适应
      return;
    }
    setScale(s);
    updateScale(s / 100);
  }, [updateScale]);

  useEffect(() => {
    if (!middleStageRef?.current) return () => {};

    const subscription = fromEvent(middleStageRef.current, 'wheel')
      .pipe(throttle(() => interval(300)))
      .subscribe((evt: Event) => {
        if (evt instanceof WheelEvent) {
          // 控制缩放倍数
          const newScale = Math.max(Math.min(scale + evt.deltaY, MAX_SCALE), MIN_SCALE);
          // TODO: 已鼠标所在位置为中心进行缩放
          updateScale(newScale / 100);
          setScale(newScale);
        }
        evt.preventDefault();
      });
    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale, updateScale]);

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
