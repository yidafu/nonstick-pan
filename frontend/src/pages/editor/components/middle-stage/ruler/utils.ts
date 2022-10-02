export function calcGraguationGap(scale: number) {
  // 真实的刻度之间的间隔，为 5 ~ 10
  // 比例尺刻度间隔要落在上面👇🏻的区间里，且为 1~5 的整数或10的倍数
  const realGapRange: [number, number] = [5, 10];

  const graduationGapRange: [number, number] = [realGapRange[0] / scale, realGapRange[1] / scale];

  // 1 格刻度对应的刻度值
  let grid = 0;
  if (scale > 1) {
    if (graduationGapRange[0] <= 5 && graduationGapRange[1] >= 5) {
      grid = 5;
    } else {
      // 取整数
      // eslint-disable-next-line no-bitwise
      grid = graduationGapRange[1] | 0;
    }
  } else {
    // 取整10
    // eslint-disable-next-line no-bitwise
    grid = (graduationGapRange[1] / 10 | 0) * 10;
  }

  /*
    一格刻度之间的真实长度
  */
  const graduationGap = grid * scale;

  return graduationGap;
}
