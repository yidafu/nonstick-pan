function real(x) { return x * 2; }

// const scale = 0.7;

const containerLength = 1300;
const rulerLenth = real(containerLength);

const origin = 0;

function test(scale) {
  /* @type {[number, number]} 实际的标尺区间 */
  // const graduationRange = [
  //   -real(scale * origin),
  //   scale * real(containerLength - origin),
  // ];

  // const maxGraduation = scale * rulerLenth;

  // 真实的刻度之间的间隔，为 5 ~ 10 ==>
  const realGapRange = [5, 10];
  // 比例尺刻度间隔要落在上面👆🏻的区间里，且为整数 5 的
  const onePxGraduationGap = 1 / scale; // 10px 对应的刻度

  const graduationGapRange = realGapRange
    .map((i) => i * onePxGraduationGap);
  console.table(graduationGapRange);
  let grid = 0;
  if (scale > 1) {
    if (graduationGapRange[0] <= 5 && graduationGapRange[1] >= 5) {
      grid = 5;
    } else {
      grid = graduationGapRange[1] | 0;
    }
  } else {
    // 取整10
    // eslint-disable-next-line no-bitwise
    grid = (graduationGapRange[1] / 10 | 0) * 10;
  }
}

test(0.2);
test(0.3);

test(0.5);
test(0.6);

test(1);
test(1.2);

test(2);
test(2.2);
