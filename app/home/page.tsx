import { Dashboard, HomeSection, RevealOnScroll, BlogsSection, ClientsSection, ContactUsSection } from '@/components';
import Script from "next/script";

export default function Home() {
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
            <RevealOnScroll>
                <section id="contactus">
                    <ContactUsSection />
                </section>
            </RevealOnScroll>
            
        </main>
    )
}
