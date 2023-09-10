"use client"
import { useContext, useEffect, useState } from "react";
import { MultiBarChart, ComposedCharts, MarketSegmentation } from "..";
import TimeFilterContext from "@/contexts/MarketAnalysisContext";

const MarketAnalysis = () =>{
  const { filteredData, handleClick, setFormattedData, dataList } = useContext(TimeFilterContext)!;
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/marketanalysis')
      .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setFormattedData(data.response);
    })
    .catch(error => {
      setError(error);
    });
    console.log('Filtered Data:', filteredData);
  },[]);
  return (
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 ">
        <div className="col-span-12 rounded-sm border border-stroke bg-[#FFFFFF] shadow-default dark:border-strokedark dark:bg-boxdark p-1.5 h-[60vh] xl:col-span-8 xl:p-4 ">
          <div className="col-span-12 mr-0">
              <div className="flex space-x-4 justify-end">
                  <button className="px-2 py-1 bg-blue-500 text-white" onClick={() => handleClick(1)}>1M</button>
                  <button className="px-2 py-1 bg-blue-500 text-white" onClick={() => handleClick(3)}>3M</button>
                  <button className="px-2 py-1 bg-blue-500 text-white" onClick={() => handleClick(6)}>6M</button>
                  <button className="px-2 py-1 bg-blue-500 text-white" onClick={() => handleClick(12)}>1Y</button>
              </div>
          </div>
          <div className="col-span-10 h-[25vh] m-0 p-2 -ml-10">
              <MultiBarChart 
                  data={filteredData} 
                  datakeys={['buyers', 'sellers']} 
                  xAxisDataKey={'day'}
                /> 
          </div>
          <div className="col-span-10 h-[25vh] m-0 p-2 -ml-10">
              <ComposedCharts 
                  data={filteredData} 
                  xAxisDataKey={'day'}
                />  
          </div>
        </div>
        <div className="col-span-12 rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark p-1.5 xl:col-span-4 h-[60vh]">
          <MarketSegmentation />
      
        </div>
      </div>
  );
}

export default MarketAnalysis;