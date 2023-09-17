"use client"
import { DuneDashboard } from "@/components";
import { fetchDuneDashboard } from "@/utils";
import { useEffect, useState } from "react";

export default function DuneDashboardPage({params}:{ params: DuneDashboard}){
    // const [duneDashboard, setDuneDashboard] = useState<DuneDashboard>();
    const [displayCount, setDisplayCount] = useState<number>(2);
    useEffect(()=>{
        setDisplayCount(2);
    },[params])
    
    const handleOnClick = () =>{
        setDisplayCount(displayCount+2);
    }
    if(params){
        return(
            <>
            <div className="sm:mx-0 sm:px-0 px-2 mx-auto py-2 xl:px-8 ">
                <div className=" grid gap-10 lg:gap-10 grid-cols-12">
                    {
                        params.dunegraphs?.map((duneGraph, index)=>(
                            <div className={`col-span-12 rounded-sm border border-stroke bg-[#FFFFFF] shadow-default dark:border-strokedark dark:bg-boxdark p-1.5 h-[50vh] xl:col-span-6 xl:p-4  lg:col-span-6 ${index>=displayCount?'hidden':''}`} key={"duneGraphdive"+index}>
                                <iframe src={duneGraph.src} className="w-full h-full" key={"duneGraph"+index}></iframe>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="w-full flex items-centerw-full items-center justify-center">
            <button className={`rounded-full bg-sky-100 p-5 ${(params.dunegraphs?.length ?? 0) <= displayCount ? 'hidden' : ''}`}
 onClick={handleOnClick}>Load More...</button>
            </div>
            </>
        );
    }else{
        return (
            <>
           <div>
            Loading...
           </div>
            </>
        );     
    }
    
};