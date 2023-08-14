"use client"
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import Link from 'next/link';
import {Category, Post} from "@/components/types";
import {fetchRecentPosts, fetchSimilarPosts} from "@/utils";
import {Simulate} from "react-dom/test-utils";


const PostWidget =  (props: {slug: String, categories: String[]})=>{
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
    useEffect(() => {
        if(props.slug){
            fetchSimilarPosts(props.categories, props.slug).then(
                (data)=>{
                   setRelatedPosts(data);
                }
            )
        }else{
            fetchRecentPosts().then((data)=>{
                setRelatedPosts(data);
            })
        }
    }, [props, props.slug]);

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                {props.slug? 'Related Posts': 'Recent Posts'}
            </h3>
            {relatedPosts.map((post: Post)=>(
                <div key={post.title} className="flex items-center w-full mb-4">
                    <div className="w-16 flex-none" >
                        <img
                            alt={post.title}
                            src={post.featuredImage.url}
                            height="80px"
                            width="80px"
                            className=" align-middle rounded-full object-cover"
                        />
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-gray-500 font-xs">
                            {moment(post.createdAt).format('MMMM DD, YYYY')}
                        </p>
                        <Link href={`/post/${post.slug}`} key={post.title} className="text-xl">
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default PostWidget;
