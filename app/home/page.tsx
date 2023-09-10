import { ThemeSwitch } from "@/components";
import {fetchPaginatedPosts, fetchPosts} from "@/utils";
import Archive from '../archive/archive';
const POSTS_PER_PAGE = 6;


export default async function Home () {
    const initialposts = await fetchPaginatedPosts([0,POSTS_PER_PAGE]);
    return (
        <main className="overflow-hidden">
            <section>
                <Archive initialposts={initialposts} />;
                <ThemeSwitch />
            </section>
            
        </main>
    )
}
