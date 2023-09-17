import React from "react";
import { LatestStats, Blogs} from "@/components";

const Dashboard: React.FC = () => {
    return (
        <>
        <div className="sm:px-0  px-2 py-2 xl:px-10 my-10 w-[95%] mx-6 ">
            <div className="w-full flex items-center justify-center mt-10">
                <h2 className="text-3xl font-semibold stylish-font text-[#3C61BD] lg:text-4xl lg:leading-tight tracking-tighter">
                    Our Work
                </h2>
            </div>
            <LatestStats/>
        </div>  
        </>
    );
};

export default Dashboard;
//AIzaSyA5Dq_1iIA2spE4jLndOSLlbRIhEMmrnhc