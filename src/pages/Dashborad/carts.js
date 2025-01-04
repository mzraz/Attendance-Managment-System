import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page 1',
  'Page 2',
  'Page 3',
  'Page 4',
  'Page 5',
  'Page 6',
  'Page 7',
];
const yLabels = [
    '0',
    '500',
    '1000',
    '1500',
    '2000',
    '2500',
    '3000',
    '4500',
    '5000',
];
const dates = ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07'];
const employeeData = [
    { name: 'Employee 1', attendance: [80, 85, 90, 92, 88, 95, 78], },
    { name: 'Employee 2', attendance: [75, 82, 88, 91, 86, 94, 80], },
    
  ];
export default function SimpleLineChart() {
  return (
    <>
    <LineChart
      width={500}
      height={300}
      series={employeeData.map((employee) => ({ data: employee.attendance, label: employee.name }))}
      xAxis={[{ scaleType: 'point', data: dates }]}
      yAxis={[{ data: ['0%', '20%', '40%', '60%', '80%', '100%'] }]}
    />
    {/* <LineChart
      width={500}
      height={300}
      series={[
        { data: pData, label: 'pv' },
        { data: uData, label: 'uv' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      yAxis={[{ data: yLabels}]}
    /> */}
    </>
  );
}