"use client"
import React, { useState, useCallback } from 'react';
import TimeFilterContext from './MarketAnalysisContext';
interface TimeFilterProviderProps {
  children: React.ReactNode;
}

const TimeFilterProvider: React.FC<TimeFilterProviderProps> = ({ children }) => {
  const [dataList, setDataList] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setFormattedData = (data: any[]) => {
    const sortedData = [...data].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    const formattedData = sortedData.map((data) => {
      return {
        ...data,
        day: new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        }).format(new Date(data.time.split(' ')[0])),
      };
    });
    setDataList(formattedData);
    setFilteredData(formattedData.slice(Math.max(formattedData.length - 30, 0)));
  };

  const handleClick = useCallback((months: number) => {
    const daysInMonths = months * 30; // Approximation
    const slicedData = dataList.slice(Math.max(dataList.length - daysInMonths, 0));
    setFilteredData(slicedData);
  }, [dataList]);

  return (
    <TimeFilterContext.Provider value={{ dataList, filteredData, setFilteredData, handleClick, isLoading, setFormattedData}}>
      {children}
    </TimeFilterContext.Provider>
  );
};
export default TimeFilterProvider;
