import {
  EyeInvisibleOutlined, EyeOutlined,
} from '@ant-design/icons';
import cn from 'classnames';
import React, {
  useEffect, useState, MouseEvent, useCallback,
} from 'react';

import {
  fromEvent, interval, throttle,
} from 'rxjs';

import { STAGE_RULRE_WIDTH } from '../constants';

import {
  graduatedScale, ratio,
} from './utils';

import { toFixed } from '@/utils';

const DEFAULT_SHORTER_GRADUATION_LENGTH = 5;
const DEFAULT_LONGGER_GRADUATION_LENGHT = 10;
const DEFAULT_LINE_WIDTH = 1;

/**
 * 鼠标点击比例尺的回调
 * @param {number} value 比例尺的读数，始终是整数
 * @param {number} offset 鼠标点击的点在比例尺上位置偏移量
 * @return {void}
 */
export type TAxisCallback = (value: number, offset: number) => void;

interface IRulerProps {
  /**
   * X 轴坐标原点偏移位置
   *
   * @type {number}
   * @memberof IRulerProps
   */
  originX: number;

  /**
   * Y轴左边原点偏移位置
   *
   * @type {number}
   * @memberof IRulerProps
   */
  originY: number;

  /**
   * 坐标尺缩放倍数，小数点后两位
   *
   * @type {number}
   * @memberof IRulerProps
   */
  scale: number;

  /**
   * 点击 X 轴坐标尺的读数
   *
   * @type {TAxisCallback}
   * @memberof IRulerProps
   */
  onXAxis?: TAxisCallback;

  /**
   *
   * @type {TAxisCallback}
   * @memberof IRulerProps
   */
  onYAxis?: TAxisCallback;
}

const color = 'rgb(173, 173, 173)';

/**
 * 渲染 X 轴坐标标尺
 *
 * @param {number} containerLength
 * @param {number} [origin=0]
 * @param {number} [scale=1] 真实的 1px 对应 (1 / scale) 标尺刻度
 * @returns
 */
function renderXAxisRuler(rect: DOMRect, origin: number = 0, scale: number = 1) {
  const $ruler = document.getElementById('x-axis-ruler') as HTMLCanvasElement;
  const ctx = $ruler.getContext('2d');
  if (!ctx) return;
  ctx.font = `${ratio(DEFAULT_LONGGER_GRADUATION_LENGHT)}px sans-serif`;
  const rulerLenth = ratio(rect.width);
  ctx.clearRect(0, 0, rulerLenth, ratio(rect.height));

  const {
    distance, list,
  } = graduatedScale(rulerLenth, origin, scale);

  const shorterGraduationHeight = ratio(DEFAULT_SHORTER_GRADUATION_LENGTH);
  const longgerGraduationHeight = ratio(DEFAULT_LONGGER_GRADUATION_LENGHT);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  ctx.lineWidth = ratio(DEFAULT_LINE_WIDTH);

  for (const dot of list) {
    ctx.beginPath();
    ctx.moveTo(dot.offset, 0);
    ctx.lineTo(
      dot.offset,
      dot.isTenth
        ? longgerGraduationHeight : shorterGraduationHeight,
    );
    ctx.stroke();
    if (dot.isTenth) {
      ctx.fillText(dot.text!, dot.offset + distance / 2, longgerGraduationHeight * 1.5);
    }
  }
}

/**
 * 渲染 X 轴坐标标尺
 *
 * @param {number} containerLength
 * @param {number} [origin=0]
 * @param {number} [scale=1] 真实的 1px 对应 (1 / scale) 标尺刻度
 * @returns
 */
function renderYAxisRuler(rect: DOMRect, origin: number = 0, scale: number = 1) {
  const $ruler = document.getElementById('y-axis-ruler') as HTMLCanvasElement;
  const ctx = $ruler.getContext('2d');
  if (!ctx) return;
  ctx.font = `${ratio(DEFAULT_LONGGER_GRADUATION_LENGHT)}px sans-serif`;
  const rulerLenth = ratio(rect.height);
  ctx.clearRect(0, 0, ratio(rect.width), rulerLenth);

  const {
    distance, list,
  } = graduatedScale(rulerLenth, origin, scale);

  const shorterGraduationHeight = ratio(DEFAULT_SHORTER_GRADUATION_LENGTH);
  const longgerGraduationHeight = ratio(DEFAULT_LONGGER_GRADUATION_LENGHT);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  ctx.lineWidth = ratio(DEFAULT_LINE_WIDTH);

  for (const dot of list) {
    ctx.beginPath();
    ctx.moveTo(0, dot.offset);
    ctx.lineTo(
      dot.isTenth
        ? longgerGraduationHeight : shorterGraduationHeight,
      dot.offset,
    );
    ctx.stroke();
    if (dot.isTenth) {
      ctx.save();
      ctx.translate(longgerGraduationHeight * 1.5, dot.offset - distance / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(dot.text!, 0, 0);
      ctx.restore();
    }
  }
}

export interface IRulerContainerOffset {
  xAxis: number,
  yAxis: number;
}

/**
 * 限制精度到小数点后两位
 *
 * @param {IRulerProps} props
 * @returns
 */
export const Ruler: React.FC<IRulerProps> = function Ruler(props) {
  const {
    originX = 0, originY = 0, scale = 1, onXAxis, onYAxis,
  } = props;
  // const [scale, setScale] = useState(100);
  // const [origin, setOrigin] = useState(0);
  const [visible, setVisible] = useState(true);
  const [rulerOffset, setRulerOffset] = useState<IRulerContainerOffset>({
    xAxis: 0, yAxis: 0,
  });

  const renderRulers = useCallback(() => {
    const rectX = document.getElementById('x-ruler-container')!.getBoundingClientRect();

    const $canvasX = document.getElementById('x-axis-ruler') as HTMLCanvasElement;
    // 根据父容器 + 设备分辨率设置设置 canvas 宽高
    $canvasX.width = ratio(rectX.width - STAGE_RULRE_WIDTH);
    $canvasX.height = ratio(rectX.height);
    setRulerOffset((offset: IRulerContainerOffset) => ({
      ...offset, xAxis: rectX.left,
    }));
    renderXAxisRuler(rectX, originX, toFixed(scale, 2));

    const rectY = document.getElementById('y-ruler-container')!.getBoundingClientRect();

    const $canvasY = document.getElementById('y-axis-ruler') as HTMLCanvasElement;

    // 根据父容器 + 设备分辨率设置设置 canvas 宽高
    $canvasY.width = ratio(rectY.width);
    $canvasY.height = ratio(rectY.height - STAGE_RULRE_WIDTH);

    setRulerOffset((offset: IRulerContainerOffset) => ({
      ...offset, yAxis: rectY.top,
    }));
    renderYAxisRuler(rectY, originY, toFixed(scale, 2));
  }, [scale, originY, originX]);

  useEffect(() => {
    renderRulers();

    const subscription = fromEvent(window, 'resize')
      .pipe(throttle(() => interval(300)))
      .subscribe(() => {
        renderRulers();
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [renderRulers]);

  function handleXAxisClick(evt: MouseEvent<HTMLDivElement>) {
    const domOffset = (evt.clientX - rulerOffset.xAxis);
    const graduationOffset = domOffset - originY;
    return onXAxis?.(Math.ceil(graduationOffset / scale), domOffset);
  }

  function handleYAxisClick(evt: MouseEvent<HTMLDivElement>) {
    const domOffset = (evt.clientY - rulerOffset.yAxis);
    const graduationOffset = domOffset - originY;
    onYAxis?.(Math.ceil(graduationOffset / scale), domOffset);
  }

  return (
    <div
      className="absolute inset-0"
    >
      <div
        className="absolute top-0 left-0 h-4 w-4 flex items-center justify-center"
        onClick={() => setVisible((v) => !v)}
      >
        { visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
      </div>
      <div
        id="x-ruler-container"
        className={cn('w-full h-4 absolute left-4', { hidden: !visible })}
        onClick={handleXAxisClick}
      >
        <canvas
          className="h-4"
          id="x-axis-ruler"
        />
      </div>
      <div
        id="y-ruler-container"
        className={cn('h-full absolute top-4 w-4', { hidden: !visible })}
        onClick={handleYAxisClick}
      >
        <canvas
          className="w-4"
          id="y-axis-ruler"
        />
      </div>

    </div>
  );
};

Ruler.defaultProps = {
  onXAxis: () => {},
  onYAxis: () => {},
};

Ruler.displayName = 'Ruler';
