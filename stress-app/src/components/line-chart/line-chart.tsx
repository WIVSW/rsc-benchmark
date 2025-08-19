'use client';
import { ChartData } from '@/types';
import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LegendPayload } from 'recharts';



interface Props {
    chart: ChartData;
    visibility: Partial<Record<string, boolean>>;
}

const LineChart: React.FC<Props> = (props) => {
  const [visibility, setVisibility] = React.useState(props.visibility);

  const onLegendClick = ({dataKey}: LegendPayload) => {
    if (typeof dataKey === 'string') {
      setVisibility((state) => ({...state, [dataKey]: !state[dataKey] }))
    }
    
  }

  return (
      <ResponsiveContainer width="100%" height={500}>
        <RechartsLineChart
          width={500}
          height={300}
          data={props.chart.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="group" />
          <YAxis type="number" />
          <Legend onClick={onLegendClick} />
          <Tooltip />
          {props.chart.lines.map((line) => {
            return <Line hide={!visibility[line.name]} key={line.name} type="monotone" dataKey={line.name} strokeOpacity={1} stroke={line.color} activeDot={{ r: 8 }} />
          })}
        </RechartsLineChart>
      </ResponsiveContainer>
  );
};



export default LineChart;
