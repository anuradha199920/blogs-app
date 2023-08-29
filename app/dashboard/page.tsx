import React from "react";
import {AreaChart, BarChart, MarketOverview, BarChartState, DataGrid, DoubleAxisBarLineChart, SingleBarChart} from "@/components";
import {fetchDuneData} from "@/utils";
import { MarketStatisticsProps, AreaChartState, MarketOverviewProps } from "@/components";
import {WEEKDAY, MARKET_OVERVIEW_QUERY, MARKET_OVERVIEW_STATISTICS, TABLE_QUERY, BIDS_PERCENTAGE} from "@/components/constants"
// without this the component renders on server and throws an error
// import dynamic from "next/dynamic";
// const MapOne = dynamic(() => import("../Maps/MapOne"), {
//   ssr: false,
// });

function deserializeMarketOverview(dataList: any){
  return dataList.result.rows.sort((a: any, b: any) =>(""+b.time).localeCompare(""+a.time));
}

interface ChartSeries{
  name: string;
  type?: string;
  data: {
    x: string;
    y: number;
  }[]
}

type InputData = {
  collection: string;
  dayBuyers: number;
  dayHighestSale: number;
  dayLowestSale: number;
  daySales: number;
  daySellers: number;
  dayVolume: number;
  dayWashVolume: null | number;
  daynftTraded: number;
  nftContractAddress: string;
  tokenId: string;
  trade: string;
  weekBuyers: number;
  weekHighestSale: number;
  weekLowestSale: number;
  weekSales: number;
  weekSellers: number;
  weekVolume: number;
  weekWashVolume: number;
  weeknftTraded: number;
}

function getBuyersSellersFormatData(dataList: any){
  dataList.result.rows.sort((a: any, b: any) =>(""+a.time).localeCompare(""+b.time));
  let buyersSeries: ChartSeries = {
    name: 'Buyers',
    data: []
  };
  let sellersSeries: ChartSeries = {
    name: 'Sellers',
    data: []
  };
  dataList.result.rows.forEach((data: any) =>{
    buyersSeries.data.push({
      x: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(data.time.split(" ")[0])),
      y: data.buyers
    });
    sellersSeries.data.push({
      x:  new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(data.time.split(" ")[0])),
      y: data.sellers
    })
  });
  return {series: [buyersSeries, sellersSeries]};
}

function getVolumeFormatData(dataList: any){
    
  let volumeSeries: ChartSeries = {
    name: 'Volume',
    type: 'line',
    data: []
  };
    
  let salesSeries: ChartSeries = {
    name: 'Sales',
    type: 'bar',
    data: []
  };

  dataList.result.rows.forEach((data: MarketStatisticsProps) =>{
    salesSeries.data.push({
      x: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(data.time.split(" ")[0])),
      y: Math.trunc(data.sales)
    });
  });

  dataList.result.rows.forEach((data: MarketStatisticsProps) =>{
    volumeSeries.data.push({
      x: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(data.time.split(" ")[0])),
      y: Math.trunc(data.volume)
    });
  });

  return {series: [volumeSeries, salesSeries]};
}


function getExpenditureChartFormat(dataList: any){
    let eth0Series: any = [];
    let eth1Series: any = [];
    let eth2Series: any = [];
    dataList.result.rows.slice(dataList.result.rows.length - 14, dataList.result.rows.length).forEach((data: any) =>{
      const day =  WEEKDAY[new Date(data.time.split(" ")[0]).getDay()];
      eth0Series.push({
        x: day,
        y: data.eth0
      });
      eth1Series.push({
        x: day,
        y: data.eth1
      });
      eth2Series.push({
        x: day,
        y: data.eth2
      });
    });
    return [{
      series: [ {
        name: '< 1Ξ',
        data: eth0Series.slice(0,7)
      },{
        name: '> 1Ξ & < 2Ξ',
        data: eth1Series.slice(0,7)
      }, {
        name: '> 2Ξ',
        data: eth2Series.slice(0,7)
      }] 
    }, {
      series:  [ {
        name: '< 1Ξ',
        data: eth0Series.slice(7, 14)
      },{
        name: '> 1Ξ & < 2Ξ',
        data: eth1Series.slice(7, 14)
      }, {
        name: '> 2Ξ',
        data: eth2Series.slice(7, 14)
      }]  
    }];
}

function getBidsPercentageData(dataList: any) {
  let bidsPercentageSeries: any = [];
  dataList.result.rows.forEach((data: any) =>{
    bidsPercentageSeries.push({
      x: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(data.time.split(" ")[0])),
      y: parseInt(data.bidsPercentage.toFixed(2))
    });
  });
  return [{
    series: [ {
      name: 'Bids Volume',
      data: bidsPercentageSeries
    }] 
  }];
}

function getTableProps(dataList: any){
  return dataList.result.rows.map((row: InputData) => ({
    ...row,
    nftParams: `${row.nftContractAddress}_${row.tokenId}`,
  }));
}

const Dashboard: React.FC = async () => {
 
  const marketOverviewResponse: MarketOverviewProps[] = deserializeMarketOverview((await fetchDuneData(MARKET_OVERVIEW_QUERY)));
  const marketStatisticsPropsResponse = await fetchDuneData(MARKET_OVERVIEW_STATISTICS);
  const bidsPercentageResponse = await fetchDuneData(BIDS_PERCENTAGE);
  marketStatisticsPropsResponse.result.rows.sort((a: any, b: any) =>(""+a.time).localeCompare(""+b.time));
  const tableProps = getTableProps(await fetchDuneData(TABLE_QUERY));
  const buyersSellersAreaChartProps: AreaChartState  = getBuyersSellersFormatData(marketStatisticsPropsResponse);
  const volumeAreaChartProps: AreaChartState = getVolumeFormatData(marketStatisticsPropsResponse);
  const barChartProps: BarChartState[] = getExpenditureChartFormat(marketStatisticsPropsResponse);
  const bidsPercentageProps: BarChartState[] = getBidsPercentageData(bidsPercentageResponse);
  return (
    <>
    <div className="sm:mx-0 sm:px-0  px-2 mx-auto py-2 lg:py-10 xl:px-10 ">
      <MarketOverview {...marketOverviewResponse}/>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 rounded-sm border border-stroke bg-[#E4E3D8] shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-8 p-7.5">
          <AreaChart props={buyersSellersAreaChartProps} chartId={"buyersSellers"} title={"NFT Market Participants Overview"}/>
        </div>
        <div className="col-span-12 rounded-sm border border-stroke bg-[#E4E3D8] p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
            <BarChart props={barChartProps} title={"Buyers'Spending"}/>
        </div >
        <div className="col-span-12 rounded-sm border border-stroke bg-[#E4E3D8] shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6 p-7.5">
          <DoubleAxisBarLineChart props={volumeAreaChartProps} chartId={"volumneChart"} title={"Volume"}/>
        </div>
        <div className="col-span-12 rounded-sm border border-stroke bg-[#E4E3D8] p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
            <SingleBarChart props={bidsPercentageProps} title={"Percent Bids Volume"}/>
        </div>
        <div className="col-span-12 ">
          <DataGrid props={tableProps}/>
        </div>
        {/* <ChartTwo />
        <ChartThree />
        <MapOne />
       
          <TableOne />
        </div>
        <ChatCard /> */}
      </div>
    </div>  
    </>
  );
};

export default Dashboard;
