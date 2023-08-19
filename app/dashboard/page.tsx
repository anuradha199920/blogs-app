import React from "react";
import {CardDataStats, MarketOverviewProps, AreaChart, BarChart, MarketOverview, BarChartState} from "@/components";
import {fetchDuneData} from "@/utils";
import { MarketStatisticsProps, AreaChartState } from "@/components";
import {WEEKDAY, MARKET_OVERVIEW_QUERY, MARKET_OVERVIEW_STATISTICS} from "@/components/constants"
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

function getChartFormatData(dataList: any){
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
        x: data.time.split(" ")[0],
        y: data.sellers
      })
    });
    return {series: [buyersSeries, sellersSeries]};
}

function getExpenditureChartFormat(dataList: any){
  dataList.result.rows.sort((a: any, b: any) =>(""+a.time).localeCompare(""+b.time));
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
        name: 'Less than 1 Eth',
        data: eth0Series.slice(0,7)
      },{
        name: 'Greater than 1 Eth & Less than 2 Eth',
        data: eth1Series.slice(0,7)
      }, {
        name: 'Greater than 2 Eth',
        data: eth2Series.slice(0,7)
      }] 
    }, {
      series:  [ {
        name: 'Less than 1 Eth',
        data: eth0Series.slice(7, 14)
      },{
        name: 'Greater than 1 Eth & Less than 2 Eth',
        data: eth1Series.slice(7, 14)
      }, {
        name: 'Greater than 2 Eth',
        data: eth2Series.slice(7, 14)
      }] 
    }];
}
const Dashboard: React.FC = async () => {
 
  const marketOverviewResponse: MarketOverviewProps[] = deserializeMarketOverview((await fetchDuneData(MARKET_OVERVIEW_QUERY)));
  const marketStatisticsPropsResponse = await fetchDuneData(MARKET_OVERVIEW_STATISTICS);
  const areaChartProps: AreaChartState  = getChartFormatData(marketStatisticsPropsResponse);
  const barChartProps: BarChartState[] = getExpenditureChartFormat(marketStatisticsPropsResponse)

  return (
    <>
    <div className="sm:mx-0 sm:px-0  px-2 mx-auto py-2 lg:py-10 xl:px-10 ">
      <MarketOverview {...marketOverviewResponse}/>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <AreaChart props={areaChartProps}/>
        <BarChart props={barChartProps}/>
        {/* <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard /> */}
      </div>
    </div>  
    </>
  );
};

export default Dashboard;
