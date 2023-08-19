import { request, gql } from 'graphql-request'
import axios from 'axios';
import {Category, Post, PostsConnection} from "@/components";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;
const duneAPI = process.env.DUNE_API!;

export async function fetchDuneData(queryId: string){
    try{
        const response = await fetch(duneAPI.replace('queryId', queryId), { next: { revalidate: 3600*6 } });
        if (!response.ok) {
            throw new Error('Failed to fetch data')
          }
        return await response.json();
    }catch(err){
        console.error(err);
    }
    
    return axios.get(duneAPI.replace('queryId', queryId))
        .then(response => {
            // Handle response
            return response.data.result.rows;
        })
        .catch(err => {
            // Handle errors
            console.error(err);
        });
}

export async function fetchPosts(){
    try {
        const document = gql`
        query GetPosts {
          postsConnection {
            edges {
              node {
                id
                title
                slug
                createdAt
                readTime
                featuredImage {
                  url
                }
                categories {
                  name
                  slug
                }
                author {
                  bio
                  id
                  name
                  profilePicture {
                    url
                  }
                }
              }
            }
          }
        }`
        const result: { postsConnection: PostsConnection } = await request(graphqlAPI, document);
        return result.postsConnection.edges.map((edge) => edge.node);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

export async function fetchRecentPosts(){
    try{
        const document = gql`
            query GetPostDetails {
                posts(
                    orderBy: createdAt_ASC
                    last: 3
                ){
                    title
                    featuredImage{
                        url
                    }
                    createdAt
                    slug
                }
                
            }
        `
        const result: { posts: Post[] } = await request(graphqlAPI, document);
        return result.posts;
    }catch (error){
        console.error("Error fetching posts:", error);
        return [];
    }

}

export async function fetchSimilarPosts( categories: String[], slug: String){
    try{
        const document = gql`
            query GetPostDetails($slug: String!, $categories: [String!]) {
                  posts(
                        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
                        last: 3
                  ) {
                        title
                        featuredImage {
                          url
                        }
                        createdAt
                        slug
                  }
            }`
        const result: { posts: Post[] } = await request(graphqlAPI, document, {slug, categories});
        return result.posts;
    }catch (error){
        console.error("Error fetching posts:", error);
        return [];
    }

}

export async function fetchCategories(){
    try{
        const document = gql`
            query MyQuery {
              categories {
                id
                name
                slug
              }
            }
        `
        const result:{categories: Category[]} = await request(graphqlAPI, document);
        return result.categories;
    }catch(error){
        console.error("Error fetching categories:", error);
        return [];
    }
}

export async function fetchPostDetails(slug: String): Promise<Post>{
    const document = gql`
        query GetPostDetails($slug: String!) {
              post(
                    where: {slug: $slug}
              ) {
                    id
                    title
                    slug
                    createdAt
                    readTime
                    featuredImage {
                        url
                    }
                    categories {
                        name
                        slug
                    }
                    author {
                        bio
                        id
                        name
                        profilePicture {
                            url
                        }
                    }
                    content {
                        json
                    }
              }
        }`
    const result: { post: Post } = await request(graphqlAPI, document, {slug});
    return result.post;
}

export async function fetchPostSlugs(){
    try{
        const document =gql`
            query getPostSlugs {
              posts {
                slug
              }
            }
        `
        const result: { posts: Post[] } = await request(graphqlAPI, document);
        return result.posts;
    }catch (error){
        console.error("Error fetching post's slugs:", error);
        return [];
    }
}

export async function fetchPaginatedPosts([skip , first]: Number[]){

    try{
        const document = gql`
        query getPaginatedPosts($skip: Int!, $first: Int!) {
            posts(skip: $skip, orderBy: publishedAt_DESC, first: $first) {
              id
              title
              slug
              createdAt
              readTime
              featuredImage {
                  url
              }
            }
          }
        `;
        const result: { posts: Post[] } = await request(graphqlAPI, document, {skip, first});
        return result.posts;
    }catch (error){
        console.error("Error fetching post's slugs:", error);
        return [];
    }
    
}