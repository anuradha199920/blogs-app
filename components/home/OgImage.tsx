import {Post} from "@/components/types";
import moment from "moment";
import Link from "next/link";
import Image from "next/image"

export default function OgImage({post}: {post: Post}){
    return (
        <div className="relative z-0 flex min-h-[calc(100vh-30vh)] items-center">
            <div className="absolute -z-10 h-full w-full before:absolute before:z-10 before:h-full before:w-full before:bg-black/30">
                <Image alt="Thumbnail" loading="eager" decoding="async" data-nimg="fill" className="object-cover bg-transparent h-full w-full absolute inset-0" sizes="100vw" src={post.featuredImage.url} width={'100'} height={'100'}/>
            </div>
            <div className="mx-auto max-w-screen-md px-5 py-20">
                <h1 className="mb-3 mt-2 text-3xl font-semibold tracking-tight text-white lg:text-5xl lg:leading-tight">
                    {post.title}
                </h1>
                <div className="mt-8 flex space-x-3 text-gray-500 ">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center">
                        <div className="flex gap-3">
                            <div className="relative h-5 w-5 flex-shrink-0">
                                <Link href="https://twitter.com/eekeyguy_eth">
                                    <Image alt={post.author.name} loading="lazy" decoding="async" data-nimg="fill" className="rounded-full object-cover bg-transparent h-full w-full absolute inset-0" sizes="100vw" src={post.author.profilePicture.url} width={'100'} height={'100'}/>
                                </Link>
                            </div>
                            <p className="text-gray-100 ">
                                <Link href="https://twitter.com/eekeyguy_eth">{post.author.name}</Link> 
                                <span className="hidden pl-2 md:inline"> ·</span>
                            </p>
                        </div>
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
        </div>    
    );
}