"use client"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { COLORS } from '../constants';
import { useState } from 'react';

const MultiBarChart = (props:{data: any[], datakeys:any[], xAxisDataKey: any} ) => {
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
      <BarChart
        data={props.data}
        width={500}
        height={170}
        maxBarSize={10}
        barGap={0}
        barCategoryGap={0}
        syncId="anyId"
        >
         <Tooltip/>
        {
          props.datakeys.map((val, index)=>(
            <Bar
            key={"bar"+index}
            stackId={index}
            dataKey={val}
            fill= {COLORS[(index)%10]}
            hide={hidden[val]}
          />
          ))
        }
        <XAxis dataKey={props.xAxisDataKey} fontSize={12} minTickGap={20}/>
        <YAxis fontSize={12}/>
        <Legend verticalAlign="top" align="right" height={36} iconType="circle" onClick={handleLegendClick}/>
      </BarChart>      
    </ResponsiveContainer>
  );
};

export default MultiBarChart;
