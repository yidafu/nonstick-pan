const devicePixelratio = window.devicePixelRatio ?? 1;

export function ratio(value: number) {
  return value * devicePixelratio;
}

function graduationAccuracy(scale: number) {
  // 真实的刻度之间的间隔，为 5 ~ 10
  // 比例尺刻度间隔要落在上面👇🏻的区间里，且为 1~5 的整数或10的倍数
  const realGapRange: [number, number] = [5, 10];

  const graduationGapRange: [number, number] = [realGapRange[0] / scale, realGapRange[1] / scale];

  // 1 格刻度对应的刻度值
  let accuracy = 0;
  if (scale > 1) {
    if (graduationGapRange[0] <= 5 && graduationGapRange[1] >= 5) {
      accuracy = 5;
    } else {
      // 取整数
      // eslint-disable-next-line no-bitwise
      accuracy = graduationGapRange[1] | 0;
    }
  } else {
    // 取整10
    // eslint-disable-next-line no-bitwise
    accuracy = (graduationGapRange[1] / 10 | 0) * 10;
  }
  return accuracy;
}

export interface LinePlot {
  offset: number;
  isTenth: boolean;
  text?: string;
}
/**
 * TODO: 会有半个刻度的误差
 *
 * @export
 * @param {number} rulerLength
 * @param {number} origin
 * @param {number} scale
 * @returns
 */
export function graduatedScale(rulerLength: number, origin: number, scale: number) {
  const graduationLength = ratio(rulerLength);
  // 比例尺的精度，一格表示的长度
  const accuracy = graduationAccuracy(scale);
  // 比例尺一格对应的真实长度
  const accuracyDistance = accuracy * scale;
  const remainder = origin % accuracyDistance;
  // 第一个刻度的读数
  const startGraduationIndicator = ((origin - remainder) / scale);

  const axesOfLinePlot = [];

  for (
    let graduationOffset = 0;
    graduationOffset + remainder < graduationLength;
    graduationOffset += accuracyDistance
  ) {
    // 当前刻度的读数
    const graduationInicator = Math.round((graduationOffset) / scale)
      - startGraduationIndicator;
    // 每 10 个刻度，需要显示指标。
    const isTenthGraduation = graduationInicator % (accuracy * 10) === 0;

    axesOfLinePlot.push({
      offset: ratio(graduationOffset + remainder),
      isTenth: isTenthGraduation,
      text: isTenthGraduation
        ? String(graduationInicator) : '-1',
    });
  }

  return {
    accuracy,
    distance: ratio(accuracyDistance),
    list: axesOfLinePlot,
  };
}
