import {Blogs} from "@/components";
import Link from "next/link";

const BlogsSection: React.FC = () => {
    return (
        <>
        <div className="sm:px-0  px-2 py-2 xl:px-10 mx-6 w-full">
            <div className="w-full flex items-center justify-center">
                <h2 className="text-3xl font-semibold stylish-font text-[#3C61BD] lg:text-4xl lg:leading-tight tracking-tighter">
                    Weekly Blogs
                </h2>
            </div>
            <Blogs />
            <div className="w-full flex items-centerw-full items-center justify-center">
                <Link href={"/archive"}>
                <div className='rounded-full bg-sky-100 p-5'>Load More...</div>
                </Link>

            
            </div>
        </div>  
        </>
    );
};
export default BlogsSection;