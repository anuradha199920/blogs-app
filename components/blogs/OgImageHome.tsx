import {Post} from "@/components/types";
import Link from "next/link";

export default function OgImageHome({post}: {post: Post}){
    return (
        <div className="relative w-[90%] md:w-[400px] h-[300px] py-0 my-0 mx-[5%] md:mx-0">
            <div className="z-0 flex items-center rounded-md my-0 py-0 relative h-full">
                <div className="absolute -z-10 h-full w-full before:absolute before:z-10 before:h-full before:w-full before:bg-black/30 before:rounded-md ">
                    <img alt="Thumbnail" loading="eager" decoding="async" data-nimg="fill" className=" rounded-md object-cover bg-transparent h-full w-full relative inset-0" sizes="100vw" src={post.featuredImage.url}/>
                </div>
                <div className="mx-auto absolute bottom-5 left-0 px-5 align-bottom rounded-md">
                    <h1 className=" text-3xl font-semibold tracking-tight text-white lg:text-4xl lg:leading-tight">
                        <Link href={`/post/${post.slug}`}>
                        <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">{post.title}</span>
                        </Link>
                    </h1>
                </div>
            </div>
        </div> 
    );
}