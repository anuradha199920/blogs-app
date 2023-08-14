import { Post } from '@/components';
export default function FancyAboutSection({post}:{post: Post}){
    return (
        <>
        <section className="py-0 overflow-hidden bg-white">
            <div className="container-fluid">
                <div className="devices-wrapper">
                    <div className="transform translate-x-0 translate-y-0 opacity-100 macbook-1" >
                        <img className="transform translate-x-0 translate-y-0 device" src={post.author.profilePicture.url} alt="" />
                    </div>
                    <div className="ipad--l-1 transform translate-x-0 translate-y-0 opacity-100">
                        <img className="device translate-custom-3d" src={post.author.profilePicture.url} alt="" />
                    </div>
                    <div className="iphone-1 transform translate-x-0 translate-y-0 opacity-100" >
                        <img className="device translate-custom-3d" src={post.author.profilePicture.url} alt="" />
                    </div>
                    <div className="ipad--l-2 transform translate-x-0 translate-y-0 opacity-100" >
                        <img className="device translate-custom-3d" src={post.featuredImage.url} alt="" />
                    </div>
                </div>
                <div className="grid grid-flow-row py-8 min-h-[100vh] align-items-center">
                    {/* <div class="col-md-auto px-md-4 ps-md-8">
                        <h1 class="display-4 fs-2 fs-sm-4 fs-md-5"><span class="overflow-hidden d-inline-block"><span class="d-inline-block" data-zanim-xs="{&quot;delay&quot;:1}" style="transform: translate(0px, 0px); opacity: 1;">look like an <span class="font-base fst-italic fw-normal">expert</span></span></span><br><span class="overflow-hidden d-inline-block pb-2"><span class="d-inline-block" data-zanim-xs="{&quot;delay&quot;:1.1}" style="transform: translate(0px, 0px); opacity: 1;">right from the start</span></span></h1>
                        <div class="overflow-hidden">
                            <p class="mt-3 mt-sm-4 font-sans-serif lead" data-zanim-xs="{&quot;delay&quot;:1.2}" style="transform: translate(0px, 0px); opacity: 1;">Head start your stylish website with a gorgeous template</p>
                        </div>
                        <div class="mt-3 mt-sm-5"><a class="btn btn-dark btn-sm me-2 my-2" href="#demoes" data-offset="60" data-zanim-xs="{&quot;delay&quot;:1.3}" style="transform: translate(0px, 0px); opacity: 1;">Explore Demos</a><a class="btn btn-outline-dark btn-sm my-2" href="https://themes.getbootstrap.com/product/sparrow-simple-seamless-alive/" target="_blank" data-zanim-xs="{&quot;delay&quot;:1.3}" style="transform: translate(0px, 0px); opacity: 1;">Purchase Sparrow ⟶</a></div>
                    </div> */}
                </div>
            </div>
        </section>
        </>
    )
}


    
// <div class="devices-wrapper">


// <div class="ipad--l-2" data-zanim-xs="{&quot;delay&quot;:0.3,&quot;animation&quot;:&quot;slide-left&quot;,&quot;duration&quot;:1.5}" style="transform: translate(0px, 0px); opacity: 1;"><img class="device" data-parallax="data-parallax" data-rellax-speed="3.4" src="assets/img/showcase/ipad--l-2.jpg" alt="" style="transform: translate3d(0px, 0px, 0px);"></div>
// <div class="iphone-2" data-zanim-xs="{&quot;delay&quot;:0.2,&quot;animation&quot;:&quot;slide-left&quot;,&quot;duration&quot;:1.5}" style="transform: translate(0px, 0px); opacity: 1;"><img class="device" data-parallax="data-parallax" data-rellax-speed="4" src="assets/img/showcase/iphone-2.jpg" alt="" style="transform: translate3d(0px, 0px, 0px);"></div>
// <div class="macbook-2" data-zanim-xs="{&quot;delay&quot;:0.4,&quot;animation&quot;:&quot;slide-left&quot;,&quot;duration&quot;:1.5}" style="transform: translate(0px, 0px); opacity: 1;"><img class="device" data-parallax="data-parallax" data-rellax-speed="5" src="assets/img/showcase/macbook-2.jpg" alt="" style="transform: translate3d(0px, 0px, 0px);"></div>
// <div class="ipad--l-3" data-zanim-xs="{&quot;delay&quot;:0.5,&quot;animation&quot;:&quot;slide-left&quot;,&quot;duration&quot;:1.5}" style="transform: translate(0px, 0px); opacity: 1;"><img class="device" data-parallax="data-parallax" data-rellax-speed="3.7" src="assets/img/showcase/ipad--l-3.jpg" alt="" style="transform: translate3d(0px, 0px, 0px);"></div>
// <div class="ipad--p-1" data-zanim-xs="{&quot;delay&quot;:0.5,&quot;animation&quot;:&quot;slide-left&quot;,&quot;duration&quot;:1.5}" style="transform: translate(0px, 0px); opacity: 1;"><img class="device" data-parallax="data-parallax" data-rellax-speed="4.8" src="assets/img/showcase/ipad--p-1.jpg" alt="" style="transform: translate3d(0px, 0px, 0px);"></div>
// <div class="iphone-3" data-zanim-xs="{&quot;delay&quot;:0.3,&quot;animation&quot;:&quot;slide-left&quot;,&quot;duration&quot;:1.5}" style="transform: translate(0px, 0px); opacity: 1;"><img class="device" data-parallax="data-parallax" data-rellax-speed="3" src="assets/img/showcase/iphone-3.jpg" alt="" style="transform: translate3d(0px, 0px, 0px);"></div>
// <div class="iphone-4" data-zanim-xs="{&quot;delay&quot;:0.2,&quot;animation&quot;:&quot;slide-left&quot;,&quot;duration&quot;:1.5}" style="transform: translate(0px, 0px); opacity: 1;"><img class="device" data-parallax="data-parallax" data-rellax-speed="3" src="assets/img/showcase/iphone-2.jpg" alt="" style="transform: translate3d(0px, 0px, 0px);"></div>
// <div class="iphone--l-1" data-zanim-xs="{&quot;delay&quot;:0.5,&quot;animation&quot;:&quot;slide-left&quot;,&quot;duration&quot;:1.5}" style="transform: translate(0px, 0px); opacity: 1;"><img class="device" data-parallax="data-parallax" data-rellax-speed="2" src="assets/img/showcase/iphone--l-1.jpg" alt="" style="transform: translate3d(0px, 0px, 0px);"></div>
// </div>
// <div class="row py-8 min-vh-100 align-items-center">
// <div class="col-md-auto px-md-4 ps-md-8">
//   <h1 class="display-4 fs-2 fs-sm-4 fs-md-5"><span class="overflow-hidden d-inline-block"><span class="d-inline-block" data-zanim-xs="{&quot;delay&quot;:1}" style="transform: translate(0px, 0px); opacity: 1;">look like an <span class="font-base fst-italic fw-normal">expert</span></span></span><br><span class="overflow-hidden d-inline-block pb-2"><span class="d-inline-block" data-zanim-xs="{&quot;delay&quot;:1.1}" style="transform: translate(0px, 0px); opacity: 1;">right from the start</span></span></h1>
//   <div class="overflow-hidden">
//     <p class="mt-3 mt-sm-4 font-sans-serif lead" data-zanim-xs="{&quot;delay&quot;:1.2}" style="transform: translate(0px, 0px); opacity: 1;">Head start your stylish website with a gorgeous template</p>
//   </div>
//   <div class="mt-3 mt-sm-5"><a class="btn btn-dark btn-sm me-2 my-2" href="#demoes" data-offset="60" data-zanim-xs="{&quot;delay&quot;:1.3}" style="transform: translate(0px, 0px); opacity: 1;">Explore Demos</a><a class="btn btn-outline-dark btn-sm my-2" href="https://themes.getbootstrap.com/product/sparrow-simple-seamless-alive/" target="_blank" data-zanim-xs="{&quot;delay&quot;:1.3}" style="transform: translate(0px, 0px); opacity: 1;">Purchase Sparrow ⟶</a></div>
// </div>
// </div>