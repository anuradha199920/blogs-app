import Image from 'next/image'
import {PostCard, PostWidget, Categories, Post} from "@/components";
import {fetchPosts} from "@/utils";
import categories from "@/components/Categories";

export default async function Home () {
    const posts = await fetchPosts();
    return (
        <main className="overflow-hidden">
            <div className="container mx-auto px-10 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        {
                            posts.map((post: Post)=>(
                            <PostCard key={post.title} post={post}/>
                            ))
                        }
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <PostWidget key={"recentPosts"} slug={""} categories={[]}/>
                        <Categories />
                    </div>
                </div>
            </div>
        </main>
    )
}
