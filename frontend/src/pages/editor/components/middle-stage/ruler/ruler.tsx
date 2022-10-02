import { Slider } from 'antd';
import React, { useEffect, useState } from 'react';

import { calcGraguationGap } from './utils';

const ratio = window.devicePixelRatio ?? 1;
function real(value: number) {
  return value * ratio;
}

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
   * 坐标尺缩放倍数
   *
   * @type {number}
   * @memberof IRulerProps
   */
  scale: number;
}

const color = 'rgb(173, 173, 173)';

/**
 * 渲染标尺
 *
 * @param {number} containerLength
 * @param {number} [origin=0]
 * @param {number} [scale=1] 真实的 10px 对应 (scale * 10) 标尺刻度
 * @returns
 */
function renderRuler(containerLength: number, origin: number = 0, scale: number = 1) {
  const $ruler = document.getElementById('x-axis-ruler') as HTMLCanvasElement;
  const ctx = $ruler.getContext('2d');
  if (!ctx) return;
  ctx.font = `${real(10)}px sans-serif`;
  const rulerLenth = real(containerLength);
  ctx.clearRect(0, 0, rulerLenth, real(16));

  const graduationGap = calcGraguationGap(scale);

  const shorterGraduationHeight = 5;
  const longgerGraduationHeight = 10;

  let graduationPos = -Math.round(Math.round(origin / graduationGap) * graduationGap);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  ctx.lineWidth = real(1);

  for (let i = 0; i * graduationGap < rulerLenth; i += 1) {
    const isTenGraduation = Math.round(graduationPos / scale)
      % (Math.round(graduationGap / scale) * 10) === 0;
    const offset = i * graduationGap;
    ctx.beginPath();
    ctx.moveTo(real(offset), 0);
    ctx.lineTo(
      real(offset),
      isTenGraduation ? real(longgerGraduationHeight) : real(shorterGraduationHeight),
    );
    ctx.stroke();
    if (isTenGraduation) {
      ctx.fillText(
        // 由于计算精度丢失，需要做四舍五入操作
        // eslint-disable-next-line no-bitwise
        String(Math.round(graduationPos / scale)),
        real(i * graduationGap + graduationGap / 2),
        real(longgerGraduationHeight * 1.5),
      );
    }
    graduationPos += graduationGap;
  }
}
/**
 * 限制精度到小数点后两位
 *
 * @param {*} props
 * @returns
 */
export const Ruler: React.FC<IRulerProps> = function (props) {
  const [scale, setScale] = useState(100);
  const [origin, setOrigin] = useState(0);

  useEffect(() => {
    console.log('update scale', scale);
    const rect = document.getElementById('x-ruler-container')!.getBoundingClientRect();

    const $canvas = document.getElementById('x-axis-ruler') as HTMLCanvasElement;
    // 根据父容器 + 设备分辨率设置设置 canvas 宽高
    $canvas.width = real(rect.width);
    $canvas.height = real(rect.height);
    renderRuler(rect.width, origin, scale / 100);
  }, [scale, origin]);

  return (
    <div>
      <div id="x-ruler-container" className="w-full h-4">
        <canvas className="h-4" id="x-axis-ruler" />
      </div>

      <Slider value={scale} max={400} min={25} onChange={(value: number) => setScale(value)} />
      <Slider value={origin} max={400} min={0} onChange={(value: number) => setOrigin(value)} />
    </div>
  );
};
