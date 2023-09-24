import { request, gql } from 'graphql-request'
import { Post, DuneDashboard, Client} from "@/components";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;
const duneAPI = process.env.DUNE_API!;

export async function fetchDuneGraphs(){
    try{
        const document = gql`query DuneGraphs {
            dunegraphs {
              src
            }
          }
          `;
        const result: {dunegraphs: {src: string}[]} = await request(graphqlAPI, document);
        return result.dunegraphs;
    }catch (error){
        console.error("Error fetching dune graphs", error);
        return [];
    }
}

export async function fetchDuneDashboard(slug: String){
    try{
        const document = gql`query MyQuery($slug: String!) {
            duneDashboard(where: {slug: $slug}) {
              slug
              name
              featuredImage {
                url
              }
              dunegraphs {
                src
              }
            }
          }`;
        const result: { duneDashboard: DuneDashboard } = await request(graphqlAPI, document, {slug});
        return result.duneDashboard;
    }catch(error){
        console.error("Error fetching dune dashboard:", error);
        return;
    }
}
export async function fetchDuneDashboardList(){
    try{
        const document = gql`query MyQuery() {
            duneDashboards() {
              slug
              name
              featuredImage {
                url
              }
              dunegraphs {
                src
              }
            }
          }
          `;
        const result: { duneDashboards: DuneDashboard[] } = await request(graphqlAPI, document);
        return result.duneDashboards;
    }catch(error){
        console.error("Error fetching dune dashboards list:", error);
        return;
    }
}
export async function fetchClients(){
    try{
        const document = gql`query MyQuery {
            clients {
              twitterLink
              userName
              profilePicture {
                url
              }
            }
          }          
          `;
        const result: { clients: Client[] } = await request(graphqlAPI, document);
        return result.clients;
    }catch(error){
        console.error("Error fetching clients list:", error);
        return;
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

export async function fetchPaginatedPosts({skip , first}: {skip: number, first: number}){

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
