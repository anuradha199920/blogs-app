import React from "react";
import {Post} from "@/components/types";
import { inherits } from "util";
import Link from "next/link";
import moment from "moment";

const HorizontalCard: React.FC<{
    post: Post;
  }> = ({post}: {post: Post}) =>{
    return (<div className="grid md:grid-cols-2 gap-5 md:gap-10 bg-custom-brown md:min-h-[calc(100vh-40vh)] sm:min-h-[50%]">
        <div className="relative aspect-video md:aspect-auto">
            <Link href={`/post/${post.slug}`}>
                <img alt="Thumbnail" fetchPriority="high" decoding="async" data-nimg="fill" className="object-cover absolute  h-full w-full md:h-[60vh]" sizes="100vw"  src={post.featuredImage.url} />
            </Link>
        </div>
        <div className="self-center px-5 pb-10">
            <Link href={`/post/${post.slug}`}>
                <div className="max-w-2xl">
                    <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-white lg:leading-tight text-brand-primary lg:text-5xl">
                        {post.title}
                    </h1>
                    <div className="flex mt-4 space-x-3 text-gray-500 md:mt-8 ">
                        <div className="flex flex-col gap-3 md:items-center md:flex-row">
                            <div>
                                <div className="flex space-x-2 text-sm md:flex-row md:items-center">
                                    <time className="text-white"  dateTime={post.createdAt}> 
                                        <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                                    </time>
                                    <span className="text-white">· {post.readTime} min read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
        <div>
        </div>
    </div>);
}

export default HorizontalCard;