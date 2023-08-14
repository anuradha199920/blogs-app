import {Post} from "@/components/types";
import { OgImageHome, PostCard } from "@/components";

export default function FeaturedPosts({ posts}:{ posts: Post[]}){
    return (
        <>
            <div className="container px-8 mx-auto xl:px-5  max-w-screen-xl py-5 lg:py-8 ">
                <div className="flex items-center justify-center mt-10">
                    <h2 className="text-2xl">
                        <strong>Featured</strong> Posts
                    </h2>
                </div>
                <div className="grid gap-10 mt-10 mb-20 lg:gap-10 md:grid-cols-3 lg:grid-cols-4 ">
                    <div className=" container md:col-span-2 md:row-span-2">
                        <OgImageHome key={posts[0].id} post={posts[0]}/>
                    </div>
                    {posts.slice(1, 8).map(post =>{
                        return <PostCard key={post.id} post={post}/>
                    })}
                </div>
                <div className="mt-10 flex justify-center">
                    <a className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300" href="/archive">
                        <span>View all Posts</span>
                    </a>
                </div>
            </div>
        </>
    );
}