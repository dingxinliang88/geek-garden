import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const BarChart = ({
  xData,
  sData,
  style = { width: "400px", height: "300px" },
  title = { text: "标题", subtext: "" },
}) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    const option = {
      title: title,
      xAxis: {
        type: "category",
        data: xData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: sData,
          type: "bar",
          areaStyle: {},
        },
      ],
    };

    option && myChart.setOption(option);
  }, [sData, xData, title]);
  return (
    <div>
      <div ref={chartRef} style={style} />
    </div>
  );
};
export default BarChart;
