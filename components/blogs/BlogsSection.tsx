import {Blogs} from "@/components";
import Link from "next/link";

const BlogsSection: React.FC = () => {
    return (
        <>
        <div className="sm:px-0 py-2 mx-[1%] w-[98%]">
            <div className="w-full flex items-center justify-center">
                <h2 className="text-3xl font-semibold stylish-font text-[#3C61BD] lg:text-4xl lg:leading-tight tracking-tighter mb-5">
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
    )
};
export default BlogsSection;