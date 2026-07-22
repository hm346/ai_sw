import * as echarts from 'echarts';
import { salesData } from './data.js';

const { months, values, company, product, unit } = salesData;

// 获取容器 DOM
const chartDom = document.getElementById('chart');
const myChart = echarts.init(chartDom);

// 配置项
const option = {
  title: {
    text: `${company} — 2025年${product}月度销售`,
    subtext: `单位：${unit}`,
    left: 'center',
    textStyle: { color: '#333', fontSize: 18 },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    formatter: (params) => {
      const p = params[0];
      return `<strong>${p.name}</strong><br/>📦 ${p.seriesName}：<b>${p.value}</b> ${unit}`;
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: months,
    axisLabel: { fontSize: 12 },
    axisTick: { alignWithLabel: true },
  },
  yAxis: {
    type: 'value',
    name: unit,
    axisLabel: { formatter: '{value}' },
  },
  series: [
    {
      name: '销售额',
      type: 'bar',
      data: values,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#5470c6' },
          { offset: 1, color: '#91cc75' },
        ]),
        borderRadius: [6, 6, 0, 0],
      },
      label: {
        show: true,
        position: 'top',
        formatter: '{c}',
        fontSize: 11,
        color: '#666',
      },
      barMaxWidth: 40,
    },
  ],
};

// 渲染图表
myChart.setOption(option);

// 响应窗口大小变化
window.addEventListener('resize', () => {
  myChart.resize();
});
