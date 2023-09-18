import { DuneDashboard } from "@/components";
import { fetchDuneDashboard } from "@/utils";
import Image from "next/image";

export default async function DuneDashboardPage({params}: {params: {slug: String}}){
    const duneDashboard: DuneDashboard | undefined= await fetchDuneDashboard(params.slug);
    if(duneDashboard){
        return(
            
            <div className="sm:mx-0 sm:px-0 px-2 mx-auto py-2 xl:px-8 ">
                <div className="rounded-2xl px-8 text-gray-500 dark:bg-gray-800 dark:text-gray-400 items-center">
                    <div className="flex flex-wrap sm:flex-nowrap sm:space-x-6 flex-col mx-auto max-w-screen-md items-center">
                        <div className="relative h-35 w-35 flex-shrink-0 items-center shadow-md rounded-full shadow-slate-800">
                            <Image
                                src={duneDashboard.featuredImage.url}
                                alt={duneDashboard.name}
                                fill
                                className="rounded-full object-cover fill"
                                sizes="96px"
                            />
                        </div>
                        <div className="mt-5 items-center">
                            <h1 className="text-gray-800 dark:text-gray-300 text-3xl font-bold ">
                                {duneDashboard.name}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="mt-10 grid gap-10 lg:gap-10 grid-cols-12">
                    {
                        duneDashboard.dunegraphs?.map((duneGraph, index)=>(
                            <div className="col-span-12 rounded-sm border border-stroke bg-[#FFFFFF] shadow-default dark:border-strokedark dark:bg-boxdark p-1.5 h-[50vh] xl:col-span-6 xl:p-4  lg:col-span-6" key={"duneGraphdive"+index}>
                                <iframe src={duneGraph.src} className="w-full h-full" key={"duneGraph"+index}></iframe>
                            </div>
                        ))
                    }
                </div>
            </div>
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