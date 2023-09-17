import {fetchPaginatedPosts} from "@/utils";
import Archive from '../archive/archive';
import { Dashboard, HomeSection, RevealOnScroll, BlogsSection, ClientsSection } from '@/components';
const POSTS_PER_PAGE = 6;

export default async function Home() {
    // const initialposts = await fetchPaginatedPosts([0,POSTS_PER_PAGE]);
    return (
        <main className="overflow-hidden scroll-smooth">
            <section id="home">
                <HomeSection/>
            </section>
            {/* <section id="archive">
                <Archive initialposts={initialposts} />;
            </section> */}
            <RevealOnScroll>
                <section id="dashboard">
                    <Dashboard/>;
                </section>
            </RevealOnScroll>
            <RevealOnScroll>
                <section id="blogs">
                <BlogsSection/>
                </section>
            </RevealOnScroll>
            <RevealOnScroll>
                <section id="clients">
                    <ClientsSection/>
                </section>
            </RevealOnScroll>
            
        </main>
    )
}
