"use client"
import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import { AreaChartState } from "@/components";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});


const options = (chartId: string) : ApexOptions => {
    return {
        legend: {
            show: true,
            position: "top",
            horizontalAlign: "left",
        },
        colors: [ "#001E85", "#4671DF"],
        chart: {
            id: chartId,
            // events: {
            //   beforeMount: (chart) => {
            //     chart.windowResizeHandler();
            //   },
            // },
            fontFamily: "Satoshi, sans-serif",
            height: 335,
            type: "area",
            dropShadow: {
              enabled: true,
              color: "#623CEA14",
              top: 10,
              blur: 4,
              left: 0,
              opacity: 0.1,
            },
            toolbar: {
                show: false
            },
            
        },
        tooltip:{
          x:{
            show: false
          },
        },
        responsive: [
          {
            breakpoint: 1024,
              options: {
                  chart: {
                    height: 400 
                  },
                  xaxis:{
                    tickAmount: 4,
                  }
              },
            },
          {
          breakpoint: 1366,
            options: {
                chart: {
                  height: 450,
                },
                xaxis:{
                  tickAmount: 6
                }
            },
          },
        ],
        stroke: {
          width: [2, 2],
          curve: "straight",
        },
        //   labels: {
        //     show: false,
        //     position: "top",
        //   },
        grid: {
            yaxis: {
              lines: {
                  show: false,
              },
            },
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 1,
            colors: "#fff",
            strokeColors: [ "#001E85", "#4671DF"],
            strokeWidth: 1,
            strokeOpacity: 1,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            hover: {
            size: undefined,
            sizeOffset: 5,
            },
        }, 
        xaxis: {
            type: "category",
            axisBorder: {
              show: true,
            },
            axisTicks: {
              show: false,
            },
            labels: {
              rotate: 0,
              show: true,
              rotateAlways: false,
              hideOverlappingLabels: true,
              style: {
                fontSize: "0.60rem",
              },
              formatter: (value: string) =>{return ` ${value} `;}
            },
        },
        yaxis: {
            title: {
                style: {
                    fontSize: "0px",
                },
            },
            axisBorder: {
              show: true,
            },
            min: 1000
        },
        
    }
};

const brushOptions = (referenceChartId: string): ApexOptions =>{
  return {
      colors: [ "#001E85", "#4671DF"],
      chart: {
        id: "brush"+referenceChartId,
        brush: {
          target: referenceChartId,
          enabled: true,
          autoScaleYaxis: false
        },
        selection: {
          enabled: true,
          // enabled: false,
          xaxis: {
            min: 200,
            max: 360
          }
        }
      },
      grid: {
        yaxis: {
          lines: {
              show: false,
          },
        },
        xaxis:{
          lines:{
            show: false
          }
        }
      },
      xaxis:{
        labels:{
          show: false
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis:{
        labels:{
          show: false
        }
      },
      legend:{
        show: false
      }

  }
}


const AreaChart: React.FC<{props: AreaChartState, chartId: string, title: string}> = ({props, chartId, title} :{props: AreaChartState, chartId: string, title: string}) => {
  const [state, setState] = useState<AreaChartState>(props);

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };

  handleReset;

  // NextJS Requirement
  const isWindowAvailable = () => typeof window !== "undefined";

  if (!isWindowAvailable()) return <></>;

  return (
    <>
      <div className="mb-4 justify-between gap-4 sm:flex">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          {title}
        </h4>
      </div>
      <div id="areaChart" className="m-0 -ml-11 h-[500px] w-[100%] p-0 ">
        <ReactApexChart
          options={options(chartId)}
          type="area"
          series={state.series}
          width="105%"
          height="450"
          className="ml-10 mb-0 pb-0"
        />
        <ReactApexChart
          options={brushOptions(chartId)}
          type="area"
          series={state.series}
          width="100%"
          height="120"
          className="ml-20 -my-11 py-0"
        />
      </div>
    </>
  );
};

export default AreaChart;


//#FF2A24-blue, #4671DF-red, #EFEBE7-cream, #FFD83E-light-skin ,#E7CBB5-skin, #5E5E5E-gray, #A89383-dark-skin, #434343-dark-gray, #001E85-dark-blue, #FFE065-yellow, #000000-black, #E4E3D8-off-white, #FFFFFF-white, #B5B5B5-light-gray, #FFD83E-yellow-dark, #FDFBEF-shirt-white