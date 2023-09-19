import React from "react";
import Image from "next/image"

const title = "WRITE YOUR OWN GROWTH STORY";
const subtitle = "WITH OUR ON-CHAIN ANALYTICS";
const description = "Empower your Web3 journey with the untapped wisdom of blockchain data";
const HomeSection= () =>{
    return (
        <>
        <div className="lg:h-full w-full md:w-[98%] md:mt-10 pb-0 mx-0 md:mx-4 rounded-xl relative min-h-[calc(100vh-40vh)] py-0">
            <div className="absolute -z-10 h-[60%] md:h-[100%] lg:h-[110%] w-[110%] md:w-full top-[20%] md:-top-[10%] -left-[10%]">
            <Image alt="Thumbnail" loading="eager" decoding="async" className="aspect-auto bg-transparent h-[100%] w-[100%] absolute inset-0 bottom-0 sm:-bottom-[5%]" sizes="100vw" src={"https://media.graphassets.com/boXTR6UsSWCliwgrsJ8V"} width={'100'} height={'100'}/>
            </div>
            <div className="mx-0 md:mx-auto px-4 md:px-5 pt-30 md:pb-20 w-[90%] absolute lg:bottom-[50%] md:left-[5%]">
                <h1 className="mt-2 text-md md:text-2xl font-semibold stylish-font text-[#3C61BD] xl:text-4xl leading-tight w-[100%] ">
                    {title}
                </h1>
                <h2 className="text-md md:text-2xl font-semibold stylish-font text-[#545454] xl:text-4xl leading-tight w-[100%] tracking-tighter ">
                    {subtitle}
                </h2>
                <h3 className="text-sm font-semibold text-[#2e2e2e] md:text-md lg:leading-tight w-[100%] ">
                    {description}
                </h3>
            </div>
        </div>   
        </>
        
    );
}
export default HomeSection;