import * as echarts from 'echarts';
import React, {
  useEffect, useRef,
} from 'react';

type EChartsOption = echarts.EChartsOption;

interface IEchartBarProps {

}

export const EchartBar: React.FC<IEchartBarProps> = function EchartBar(props) {
  const refEchartDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!refEchartDom.current) return;
    const myChart = echarts.init(refEchartDom.current);

    const option: EChartsOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: { type: 'value' },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    };
    myChart.setOption(option);
  }, []);

  return (
    <div>
      <div
        style={{
          width: '300px', height: '300px',
        }}
        ref={refEchartDom}
      />
    </div>
  );
};
