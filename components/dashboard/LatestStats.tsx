"use client"
import { DuneDashboard, DuneDashboardPage } from "@/components";
import { fetchDuneDashboardList } from "@/utils";
import Image from "next/image";
import React, {useEffect, useState} from "react";

export default function LatestStats(){
    const [duneDashboard, setDuneDashboard] = useState<DuneDashboard[]>();
    const [isVisible, setIsVisible] = useState(false);
    const [param, setParam] = useState<DuneDashboard>();

    useEffect(()=>{
        fetchDuneDashboardList()
        .then(response=>{
            setDuneDashboard(response);
            if(response?.length && response.length > 0 ){
                setParam(response[0]);
                setIsVisible(true);
            }
        }).catch((error)=>{
            console.log(error);
        })
    },[])

    const handleClick = (value: any) => {
        setParam(value);
        setIsVisible(true);
    };

    const handleClose = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsVisible(false);
        setParam(undefined);
    };
    
    if(duneDashboard){
        return (<>
            <div className="grid grid-cols-12" >
                <div className="w-full col-span-12">
                <div className="flex flex-col md:m-auto md:p-auto w-full">
                <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                    <div className="flex flex-nowrap overflow-y-visible">
                        {duneDashboard.map((duneDashboard, index) =>(
                            <div key={"duneDashboardList:"+index} >
                                <div className="inline-block px-1 md:px-3 relative mt-10" onClick={() => handleClick(duneDashboard)}>
                                    <div className={`relative p-2 rounded-md border md:py-8 md:px-7.5 shadow-md align-middle md:w-[400px] w-[200px] hover:bg-sky-100 cursor-pointer ${param?.slug==duneDashboard.slug? 'bg-sky-100':'bg-white'}`}>                                        
                                        <div className="flex flex-wrap items-center sm:flex-nowrap sm:space-x-6 justify-evenly" >
                                            <div className="relative mt-1 h-15 w-15 flex-shrink-0 md:h-30 md:w-30">  
                                                <Image
                                                    src={duneDashboard.featuredImage.url}
                                                    alt={duneDashboard.name}
                                                    fill
                                                    className="rounded-full object-cover fill"
                                                    sizes="96px"
                                                />
                                            </div>
                                            <div className="mb-3 h-24 flex items-center">
                                                <h3 className="lg:text-xl text-sm font-bold text-gray-800 dark:text-gray-300">
                                                    {duneDashboard.name}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className={`absolute -top-4 -right-4 z-10 ${param?.slug!=duneDashboard.slug?'hidden':''}`} onClick={handleClose}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
</svg>
                                    </div>  
                                    </div>
                                      
                                </div>
                            </div>))}

                    </div>
                </div>
                
            </div>
                </div>
            </div>
            {isVisible && param && <DuneDashboardPage params={param} />}
        </>)
    }else{
        return (
            <div>
                Loading...
            </div>
        )
    }
};