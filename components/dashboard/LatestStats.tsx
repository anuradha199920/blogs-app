import { DuneDashboard } from "@/components";
import { fetchDuneDashboardList } from "@/utils";
import Link from "next/link";
import Image from "next/image";

export default async function LatestStats(){
    const duneDashboard: DuneDashboard[] | undefined = await fetchDuneDashboardList();
    if(duneDashboard){
        return (<>
            <div className="flex flex-col bg-white m-auto p-auto">
                <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                    <div className="flex flex-nowrap">
                        {duneDashboard.map(duneDashboard =>(
                            <Link href={`/lateststats/${duneDashboard.slug}`} className="cursor-pointer">
                                <div className="inline-block px-3">
                                <div className="rounded-md border border-stroke py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark align-middle">                                        
                                    <div className="flex flex-wrap items-start sm:flex-nowrap sm:space-x-6 align-middle">
                                            <div className="relative mt-1 h-24 w-24 flex-shrink-0">  
                                                <Image
                                                    src={duneDashboard.featuredImage.url}
                                                    alt={duneDashboard.name}
                                                    fill
                                                    className="rounded-full object-cover fill"
                                                    sizes="96px"
                                                />
                                            </div>
                                            <div>
                                                <div className="mb-3">
                                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-300">
                                                    {duneDashboard.name}
                                                </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>))}
                    </div>
                </div>
            </div></>);
    }else{
        return (
            <div>
                Loading...
            </div>
        )
    }
};