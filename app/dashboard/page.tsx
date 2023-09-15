import React from "react";
import { MarketOverview, MarketAnalysis, LatestStats} from "@/components";
import TimeFilterProvider from "@/contexts/MarketAnalysisProvider";


// function getBidsPercentageData(dataList: any) {
//   let bidsPercentageSeries: any = [];
//   dataList.forEach((data: any) =>{
//     bidsPercentageSeries.push({
//       x: new Intl.DateTimeFormat("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "2-digit",
//       }).format(new Date(data.time.split(" ")[0])),
//       y: parseInt(data.bidsPercentage.toFixed(2))
//     });
//   });
//   return [{
//     series: [ {
//       name: 'Bids Volume',
//       data: bidsPercentageSeries
//     }] 
//   }];
// }

const Dashboard: React.FC = async () => {

  return (
    <>
    <div className="sm:mx-0 sm:px-0  px-2 mx-auto py-2 lg:py-10 xl:px-10 ">
      <LatestStats />
      <MarketOverview />
      <TimeFilterProvider>
        <MarketAnalysis />
      </TimeFilterProvider>
    </div>  
    </>
  );
};

export default Dashboard;
