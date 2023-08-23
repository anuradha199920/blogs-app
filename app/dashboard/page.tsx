import React from "react";
import { MarketOverviewProps, AreaChart, BarChart, MarketOverview, BarChartState, DataGrid} from "@/components";
import {fetchDuneData} from "@/utils";
import {TableProps} from "@/components";
import { MarketStatisticsProps, AreaChartState } from "@/components";
import {WEEKDAY, MARKET_OVERVIEW_QUERY, MARKET_OVERVIEW_STATISTICS, TABLE_QUERY} from "@/components/constants"
// without this the component renders on server and throws an error
// import dynamic from "next/dynamic";
// const MapOne = dynamic(() => import("../Maps/MapOne"), {
//   ssr: false,
// });

function deserializeMarketOverview(dataList: any){
  return dataList.result.rows
    .map(
      (data: any)=>new MarketOverviewProps(        
        data.Highest_Sale,
        data.buyers,
        data.sellers, 
        data.organic_volume, 
        data.sales, 
        data.time,
        data.wash_volume,
        data.wash_volume_percentage))
    .sort((a: any, b: any) =>(""+b.time).localeCompare(""+a.time));
}

interface ChartSeries{
  name: string;
  data: {
    x: string;
    y: number;
  }[]
}

type InputData = {
  collection: string;
  collectionAge: null | string;
  dayBuyers: number;
  dayHighestSale: number;
  daySales: number;
  daySellers: number;
  dayVolume: number;
  dayWashVolume: null | number;
  daynftTraded: number;
  diamondHands: null | number;
  monthBuyers: number;
  monthHighestSale: number;
  monthSales: number;
  monthSellers: number;
  monthVolume: number;
  monthWashVolume: number;
  monthnftTraded: number;
  address: string;
  supply: null | number;
  tokenId: string;
  trade: string;
  weekBuyers: number;
  weekHighestSale: number;
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
      data: []
    };
    dataList.result.rows.forEach((data: MarketStatisticsProps) =>{
      volumeSeries.data.push({
        x: new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }).format(new Date(data.time.split(" ")[0])),
        y: data.volume.toFixed(2)
      });
    });
    return {series: [volumeSeries]};
}

function getSalesFormatData(dataList: any){
  let salesSeries: ChartSeries = {
    name: 'Sales',
    data: []
  };
  dataList.result.rows.forEach((data: MarketStatisticsProps) =>{
    salesSeries.data.push({
      x: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(data.time.split(" ")[0])),
      y: data.sales
    });
  });
  return {series: [salesSeries]};
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

function getTableProps(dataList: any){
  return dataList.result.rows.map((row: InputData) => ({
    ...row,
    nftParams: `${row.address}_${row.tokenId}`,
  }));
}

const Dashboard: React.FC = async () => {
 
  const marketOverviewResponse: MarketOverviewProps[] = deserializeMarketOverview((await fetchDuneData(MARKET_OVERVIEW_QUERY)));
  const marketStatisticsPropsResponse = await fetchDuneData(MARKET_OVERVIEW_STATISTICS);
  marketStatisticsPropsResponse.result.rows.sort((a: any, b: any) =>(""+a.time).localeCompare(""+b.time));
  const tableProps = getTableProps(await fetchDuneData(TABLE_QUERY));
  const buyersSellersAreaChartProps: AreaChartState  = getBuyersSellersFormatData(marketStatisticsPropsResponse);
  const volumeAreaChartProps: AreaChartState = getVolumeFormatData(marketStatisticsPropsResponse);
  const salesAreaChartProps: AreaChartState = getSalesFormatData(marketStatisticsPropsResponse);
  const barChartProps: BarChartState[] = getExpenditureChartFormat(marketStatisticsPropsResponse)

  return (
    <>
    <div className="sm:mx-0 sm:px-0  px-2 mx-auto py-2 lg:py-10 xl:px-10 ">
      <MarketOverview {...marketOverviewResponse}/>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 rounded-sm border border-stroke bg-[#E4E3D8] shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-8 p-7.5">
          <AreaChart props={buyersSellersAreaChartProps} chartId={"buyersSellers"} title={"NFT Market Participants Overview"}/>
        </div>
        <BarChart props={barChartProps}/>
        <div className="col-span-12 rounded-sm border border-stroke bg-[#E4E3D8] shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6 p-7.5">
          <AreaChart props={volumeAreaChartProps} chartId={"volumneChart"} title={"Volume"}/>
        </div>
        <div className="col-span-12 rounded-sm border border-stroke bg-[#E4E3D8] shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6 p-7.5">
          <AreaChart props={salesAreaChartProps} chartId={"salesChart"} title={"Sales"}/>
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
