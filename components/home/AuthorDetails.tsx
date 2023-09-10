import React from "react";
import {Author} from "@/components/types";
import Image from 'next/image';
import {grpahCMSImageLoader} from "@/utils/util";


export default function AuthorDetails({author}: {author: Author}){
    return(
        <div className="bg-cyan-100 text-center mt-20 mb-8 p-12 relative rounded-lg bg-opacity-20 w-full inline-flex flex-row justify-between">
            <div >
                <Image
                    unoptimized
                    loader={grpahCMSImageLoader}
                    alt={author.name}
                    height="100"
                    width="100"
                    className="align-middle rounded-full"
                    src={author.profilePicture.url}
                />
            </div>
            <div>
                <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
                <p className="text-white text-ls">{author.bio}</p>
            </div>

        </div>
    );
}