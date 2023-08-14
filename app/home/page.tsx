import Image from 'next/image'
import {PostCard, PostWidget, Categories, Post, ThemeSwitch, HorizontalCard, FeaturedPosts, FancyAboutSection} from "@/components";
import {fetchPosts} from "@/utils";

export default async function Home () {
    const posts: Post[] | undefined = await fetchPosts();
    const horizontalCard = ()=>{
        if(posts!==undefined && posts[0]!==undefined){
            return <HorizontalCard post={posts[0]} />
        }
    };
    return (
        <main className="overflow-hidden">
            {/* <FancyAboutSection post={posts[0]}/> */}
            <section>
                {horizontalCard()}
                <div className="container mt-10 mx-auto">
                    <FeaturedPosts posts={posts}/>
                </div>
                <ThemeSwitch />
            </section>
            
        </main>
    )
}
