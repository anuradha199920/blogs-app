import React from 'react';
import {Post} from "@/components/types";
import moment from 'moment';
import Link from "next/link";

const PostCard: React.FC<any> = ({post}: {post: Post})=> {

    return (
        <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105   dark:bg-gray-800">
                <Link className="relative block aspect-[5/4]" href={`/post/${post.slug}`}>
                    
                    <img alt="Thumbnail" fetchPriority="high" decoding="async" data-nimg="fill" className="object-cover transition-all absolute h-full w-full inset-0 bg-transparent" sizes="(max-width: 768px) 30vw, 33vw" src={`${post.featuredImage!=null ? post.featuredImage.url: ''}`} />
                </Link>
            </div>
            <div className="">
                <div>
                    <h2 className="text-2xl line-clamp-2 font-medium  tracking-normal text-black mt-2    dark:text-white">
                        <Link href={`/post/${post.slug}`}>
                            <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">{post.title}</span>
                        </Link>
                    </h2>
                    <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                        <time className="truncate text-sm" dateTime="2022-10-20T12:28:00.000Z">{moment(post.createdAt).format('MMM DD, YYYY')}</time>
                        <span className="trucate text-sm">· {post.readTime} min read</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PostCard;