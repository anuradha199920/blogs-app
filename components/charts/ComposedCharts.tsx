"use client"
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ComposedChart, Line, Area } from 'recharts';
import { useState } from 'react';

const ComposedCharts = (props:{data: any[], xAxisDataKey: any} ) => {
  const [hidden, setHidden] = useState<{
    [key: string]: boolean;
  }>({});
  const handleLegendClick = (e: any) => {
    setHidden({ 
      ...hidden, 
      [e.dataKey]: !hidden[e.dataKey] });
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
          width={500}
          height={170}
          data={props.data}
          syncId="anyId"
          margin={{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis dataKey={props.xAxisDataKey} fontSize={12}/>
          <YAxis fontSize={12} />
          <Tooltip />
          <Legend verticalAlign="top" align="right" height={36} onClick={handleLegendClick}/>
          <Area type="monotone" dataKey="volume" fill="#8884d8" stroke="#8884d8" />
          <Line type="monotone" dataKey="sales" stroke="#ff7300" dot={false}/>
        </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedCharts;
