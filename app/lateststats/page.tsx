import { fetchDuneGraphs } from "@/utils";

export default async function LatestStats(){
    const duneGraphsSrc: {src: string}[] = await fetchDuneGraphs();
    return (
        <>
        <div className="sm:mx-0 sm:px-0  px-2 mx-auto py-2 lg:py-10 xl:px-10 ">
        <div className="mt-10 grid gap-10  lg:gap-10 grid-cols-12">
            {
                duneGraphsSrc.map((duneGraph, index)=>(
                    <div className="col-span-12 rounded-sm border border-stroke bg-[#FFFFFF] shadow-default dark:border-strokedark dark:bg-boxdark p-1.5 h-[50vh] xl:col-span-6 xl:p-4  lg:col-span-6" key={"duneGraphdive"+index}>
                        <iframe src={duneGraph.src} className="w-full h-full" key={"duneGraph"+index}></iframe>
                    </div>
                ))
            }
            </div>
            </div>
        </>
    );
};