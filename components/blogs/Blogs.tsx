import {fetchPaginatedPosts} from "@/utils";
import { OgImageHome } from "..";

const Blogs =  async()=>{
    const initialposts = await fetchPaginatedPosts([0,6]);
    if(initialposts){
        return (
            <>
            <div className="w-full mx-0">
                    <div className="flex flex-col w-full ">
                    <div className="flex overflow-x-scroll hide-scroll-bar h-[350px] my-0 py-0 w-full ">
                        <div className="flex flex-nowrap h-full overflow-y-clip my-0 py-0 w-full">
                            {initialposts.map((post, index) =>(
                                <div key={"blogs:"+index}>
                                    <div className="relative inline-block px-3 h-full my-0 py-0 ">
                                        <OgImageHome post={post}/>
                                    </div>
                                </div>))}
                        </div>
                    </div>
                    </div>
                </div>
                </>
    )
    }else{
        return (
            <>
            <div>
                Loading...
            </div>
            </>
        )
    }
    
      
}

export default Blogs;