"use client"
import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { AreaChartState } from "@/components";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});


const options = () : ApexOptions => {
    return {
        legend: {
            show: true,
            position: "top",
            horizontalAlign: "left",
        },
        colors: [ "#001E85", "#4671DF"],
        chart: {
            id: 'chart1',
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
                    height: 400                  },
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
            tickAmount: 10,
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
                fontSize: "0.70rem",
              }
            }
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

const brushOptions = (): ApexOptions =>{
  return {
      colors: [ "#001E85", "#4671DF"],
      chart: {
        id: "brush1",
        brush: {
          target: "chart1",
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


const AreaChart: React.FC<{props: AreaChartState}> = ({props} :{props: AreaChartState}) => {
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
    <div className="col-span-12 rounded-sm border border-stroke bg-[#E4E3D8] shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-8">
      <div id="areaChart" className="m-0 -ml-5 h-[500px] w-[100%] p-0 ">
        <ReactApexChart
          options={options()}
          type="area"
          series={state.series}
          width="105%"
          height="400"
          className="ml-10 mb-0 pb-0"
        />
        <ReactApexChart
          options={brushOptions()}
          type="area"
          series={state.series}
          width="100%"
          height="120"
          className="ml-20 -my-11 py-0"
        />
      </div>
      {/* <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AreaChart;


//#FF2A24-blue, #4671DF-red, #EFEBE7-cream, #FFD83E-light-skin ,#E7CBB5-skin, #5E5E5E-gray, #A89383-dark-skin, #434343-dark-gray, #001E85-dark-blue, #FFE065-yellow, #000000-black, #E4E3D8-off-white, #FFFFFF-white, #B5B5B5-light-gray, #FFD83E-yellow-dark, #FDFBEF-shirt-white