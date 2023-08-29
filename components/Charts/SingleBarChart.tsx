"use client"
import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { BarChartState } from "@/components";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const options: ApexOptions = {
  colors: [ "#001E85", "#4671DF", "#B5B5B5"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 700,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "85%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",
    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
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
};



const SingleBarChart: React.FC<{props: BarChartState[], title: string}> = ({props, title} :{props: BarChartState[], title: string}) => {
  const [state, setState] = useState<BarChartState>(props[0]);

  return (
  <> 
    <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
        </div>
    </div>
    <div>
        <div id="barChart" className="-ml-5 -mb-9">
            <ApexCharts
            options={options}
            series={state.series}
            type="bar"
            height={500}
            />
        </div>
    </div>
    </>);
};

export default SingleBarChart;
