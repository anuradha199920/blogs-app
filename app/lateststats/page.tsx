import { fetchDuneGraphs } from "@/utils";

export async function LatestStats(){
    const duneGraphsSrc: {src: string}[] = await fetchDuneGraphs();
    return (
        <>
        <div className="sm:mx-0 sm:px-0  px-2 mx-auto py-2 lg:py-10 xl:px-10 ">
        <div className="mt-10 grid gap-10  lg:gap-10 grid-cols-12">
            {
                duneGraphsSrc.map((duneGraph, index)=>(
                    <div className="col-span-12 rounded-sm border border-stroke bg-[#FFFFFF] shadow-default dark:border-strokedark dark:bg-boxdark p-1.5 h-[50vh] xl:col-span-6 xl:p-4  lg:col-span-6">
                        <iframe src={duneGraph.src} className="w-full h-full" key={"duneGraph"+index}></iframe>
                    </div>
                ))
            }
        
            <div className="col-span-12 rounded-sm border border-stroke bg-[#FFFFFF] shadow-default dark:border-strokedark dark:bg-boxdark p-1.5 h-[50vh] xl:col-span-6 xl:p-4 lg:col-span-6">
        <iframe src="https://dune.com/embeds/2203050/3613932" className="w-full h-full"></iframe>
            </div>
            </div>
            </div>
        </>
    );
};

export default LatestStats;