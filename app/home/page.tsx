import {fetchPaginatedPosts} from "@/utils";
import Archive from '../archive/archive';
import { Dashboard, HomeSection, RevealOnScroll, BlogsSection, ClientsSection } from '@/components';
import Script from "next/script";
const POSTS_PER_PAGE = 6;

export default async function Home() {
    // const initialposts = await fetchPaginatedPosts([0,POSTS_PER_PAGE]);
    return (
        <main className="overflow-hidden scroll-smooth">
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}/>
    <Script id="google-analytics">
    {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
            });
        `}
      </Script>
            <section id="home">
                <HomeSection/>
            </section>
            {/* <section id="archive">
                <Archive initialposts={initialposts} />;
            </section> */}
            <RevealOnScroll>
                <section id="dashboard">
                    <Dashboard/>
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
