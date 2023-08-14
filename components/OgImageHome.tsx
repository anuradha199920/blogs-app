import {Post} from "@/components/types";
import moment from "moment";
import Link from "next/link";

export default function OgImageHome({post}: {post: Post}){
    return (
        <div className="relative z-0 flex min-h-[calc(100vh-30vh)] items-center rounded-md">
            <div className="absolute -z-10 h-full w-full before:absolute before:z-10 before:h-full before:w-full before:bg-black/30 before:rounded-md">
                <img alt="Thumbnail" loading="eager" decoding="async" data-nimg="fill" className=" rounded-md object-cover bg-transparent h-full w-full absolute inset-0" sizes="100vw" src={post.featuredImage.url}/>
            </div>
            <div className="mx-auto absolute bottom-5 left-0 px-5 align-bottom rounded-md">
                <h1 className=" mb-3 mt-2 text-3xl font-semibold tracking-tight text-white lg:text-4xl lg:leading-tight">
                    <Link href={`/post/${post.slug}`}>
                    <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">{post.title}</span>
                    </Link>
                </h1>
                <div className="mt-8 flex space-x-3 text-gray-500 ">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center">
                        <div>
                            <div className="flex space-x-2 text-sm md:flex-row md:items-center">
                                <time className="text-white"  dateTime={post.createdAt}> 
                                    <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                                </time>
                                <span className="text-white">· 5 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    );
}