import React from "react";

import {fetchPostDetails, fetchPostSlugs} from "@/utils";
import {AuthorDetails, Categories, Category, CommentForm, Comments, PostDetail, OgImage, Container} from "@/components";
import moment from "moment";
import {AuthorCard} from "@/components";

export default async function PostDetails ({params}: {params: {slug: String}}){
    const post = await fetchPostDetails(params.slug);
    return(
    
        <>
        <OgImage post={post}/>
        <Container>
        <article className="mx-auto max-w-screen ">
            <PostDetail post={post}/>
            {post.author && <AuthorCard author={post.author} />}
        </article>
      </Container> 
        </>
        
    );
}
