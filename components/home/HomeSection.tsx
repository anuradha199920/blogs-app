import React from "react";
import Image from "next/image"

const title = "WRITE YOUR OWN GROWTH STORY";
const subtitle = "WITH OUR ON-CHAIN ANALYTICS";
const description = "Empower your Web3 journey with the untapped wisdom of blockchain data";
const HomeSection= () =>{
    return (
        <>
        <div className="lg:h-full w-[98%] mt-10 pb-0 mx-4  rounded-xl relative min-h-[calc(100vh-40vh)] py-0">
            <div className="absolute -z-10 sm:h-[80%] md:h-[100%] lg:h-[110%] w-full before:absolute before:z-10 before:h-full before:w-full lg:-top-[10%]">
            <Image alt="Thumbnail" loading="eager" decoding="async" className="aspect-auto bg-transparent h-[100%] w-[100%] absolute inset-0 bottom-0 sm:-bottom-[5%]" sizes="100vw" src={"https://media.graphassets.com/boXTR6UsSWCliwgrsJ8V"} width={'100'} height={'100'}/>
            </div>
            <div className="mx-auto px-5 py-20 w-[100%] absolute lg:bottom-[50%] left-[5%]">
                <h1 className="mt-2 text-3xl font-semibold stylish-font text-[#3C61BD] xl:text-4xl lg:leading-tight w-[100%] ">
                    {title}
                </h1>
                <h2 className="text-3xl font-semibold stylish-font text-[#545454] lg:text-4xl lg:leading-tight w-[100%] tracking-tighter">
                    {subtitle}
                </h2>
                <h3 className=" font-semibold text-[#2e2e2e] lg:text-md lg:leading-tight w-[100%] tracking-wide">
                    {description}
                </h3>
            </div>
        </div>   
        </>
        
    );
}
export default HomeSection;