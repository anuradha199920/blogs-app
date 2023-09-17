import {fetchPaginatedPosts} from "@/utils";
import { OgImageHome } from "..";

const Blogs =  async()=>{
    const initialposts = await fetchPaginatedPosts([0,6]);
    if(initialposts){
        return (
            <>
            <div className="grid grid-cols-12 w-full">
                    <div className="w-full col-span-12 mx-auto">
                    <div className="flex flex-col m-auto p-auto w-full ">
                    <div className="flex overflow-x-scroll hide-scroll-bar h-[600px] my-0 py-0">
                        <div className="flex flex-nowrap h-full overflow-y-clip">
                            {initialposts.map((post, index) =>(
                                <div key={"blogs:"+index} >
                                    <div className="relative inline-block px-3 h-full">
                                        <OgImageHome post={post}/>
                                    </div>
                                </div>))}
                        </div>
                    </div>
                    
                </div>
                    </div>
                </div>
                </>
    );
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