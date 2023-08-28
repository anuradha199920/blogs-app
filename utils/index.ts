import { request, gql } from 'graphql-request'
import {Category, NFTHolders, Post, PostsConnection, NFTSales, NFTTraders, NFTFloorPrice, MarketOverviewProps, MarketStatisticsProps} from "@/components";
import prisma from '../lib/prisma';
import { NFTStats } from '@/components';
import {TABLE_QUERY, NFT_FLOOR_PRICE, NFT_TRADERS, NFT_HOLDERS, NFT_SALES, MARKET_OVERVIEW_QUERY, MARKET_OVERVIEW_STATISTICS} from "@/components/constants"


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;
const duneAPI = process.env.DUNE_API!;

export async function fetchDuneData(queryId: string){
    try{
        const response = await fetch(duneAPI.replace('queryId', queryId), { next: { revalidate: 0 } });
        if (!response.ok) {
            throw new Error('Failed to fetch data')
          }
        return await response.json();
    }catch(err){
        console.error(err);
    }
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

export async function deleteNFTStats(){
    try {
        const deleteResult = await prisma.nFTStats.deleteMany({});
        console.log(`${deleteResult.count} NFtStats deleted.`);
    } catch (error) {
        console.error('Error deleting NFtStats:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}
export async function deleteNFTSales(){
    try {
        const deleteResult = await prisma.nFTSales.deleteMany({});
        console.log(`${deleteResult.count} NFtSales records deleted.`);
    } catch (error) {
        console.error('Error deleting NFtSales:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export async function deleteNFTHolders(){
    try {
        const deleteResult = await prisma.nFTHolders.deleteMany({});
        console.log(`${deleteResult.count} NFtHolders records deleted.`);
    } catch (error) {
        console.error('Error deleting NFtHolders:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export async function deleteNFTTraders(){
    try {
        const deleteResult = await prisma.nFTTraders.deleteMany({});
        console.log(`${deleteResult.count} NFTTraders records deleted.`);
    } catch (error) {
        console.error('Error deleting NFTTraders:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}


export async function deleteNFTFloorPrice(){
    try {
        const deleteResult = await prisma.nFTFloorPrice.deleteMany({});
        console.log(`${deleteResult.count} NFTFloorPrice records deleted.`);
    } catch (error) {
        console.error('Error deleting NFTFloorPrice:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export async function deleteMarketOverview(){
    try {
        const deleteResult = await prisma.marketOverview.deleteMany({});
        console.log(`${deleteResult.count} MarketOverview records deleted.`);
    } catch (error) {
        console.error('Error deleting marketOverview:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export async function deleteMarketAnalysis(){
    try{
        const deleteResult = await prisma.marketAnalysis.deleteMany({});
        console.log(`${deleteResult.count} MarketAnalyasis records deleted.`);
    } catch (error) {
        console.error('Error deleting marketAnalyasis:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export async function insertNFTStatsInBulk(nftStats: NFTStats[]){
    try{
        const result  = await prisma.$transaction([
            prisma.nFTStats.createMany({
                data: nftStats,
                skipDuplicates: false,
            })
        ])
        console.log("saved: ", result);
    } catch(error){
        console.error("Error performing bulk insert: ", error);
        throw error;
    } finally{
        await prisma.$disconnect();
    }
}

export async function insertNFTSalesInBulk(nftSales: NFTSales[]){
    try{
        const result  = await prisma.$transaction([
            prisma.nFTSales.createMany({
                data: nftSales,
                skipDuplicates: true,
            })
        ])
        console.log("saved: ", result);
    } catch(error){
        console.error("Error performing bulk insert: ", error);
        throw error;
    } finally{
        await prisma.$disconnect();
    }
}

export async function insertNFTHoldersInBulk(nftHolders: NFTHolders[]){
    try{
        const result  = await prisma.$transaction([
            prisma.nFTHolders.createMany({
                data: nftHolders,
                skipDuplicates: true,
            })
        ])
        console.log("saved: ", result);
    } catch(error){
        console.error("Error performing bulk insert: ", error);
        throw error;
    } finally{
        await prisma.$disconnect();
    }
}

export async function insertNFTTradersInBulk(nftTraders: NFTTraders[]){
    try{
        const result  = await prisma.$transaction([
            prisma.nFTTraders.createMany({
                data: nftTraders,
                skipDuplicates: true,
            })
        ])
        console.log("saved: ", result);
    } catch(error){
        console.error("Error performing bulk insert: ", error);
        throw error;
    } finally{
        await prisma.$disconnect();
    }
}

export async function insertNFTFloorPriceInBulk(nftFloorPrice: NFTFloorPrice[]){
    try{
        const result  = await prisma.$transaction([
            prisma.nFTFloorPrice.createMany({
                data: nftFloorPrice,
                skipDuplicates: false,
            })
        ])
        console.log("saved: ", result);
    } catch(error){
        console.error("Error performing bulk insert: ", error);
        throw error;
    } finally{
        await prisma.$disconnect();
    }
}

export async function insertMarketOverviewInBulk(marketOverview: MarketOverviewProps[]){
    try{
        const result  = await prisma.$transaction([
            prisma.marketOverview.createMany({
                data: marketOverview,
                skipDuplicates: false,
            })
        ])
        console.log("saved: ", result);
    } catch(error){
        console.error("Error performing bulk insert: ", error);
        throw error;
    } finally{
        await prisma.$disconnect();
    }
}

export async function insertMarketAnalysisInBluk(marketStatistics: MarketStatisticsProps[]){
    try{
        const result  = await prisma.$transaction([
            prisma.marketAnalysis.createMany({
                data: marketStatistics,
                skipDuplicates: false,
            })
        ])
        console.log("saved: ", result);
    } catch(error){
        console.error("Error performing bulk insert: ", error);
        throw error;
    } finally{
        await prisma.$disconnect();
    }
}

export async function refershDatabase(){
    try{
        //1. fetch data from dune api
        const responseNftStats = await fetchDuneData(TABLE_QUERY);
        const responseNftSales = await fetchDuneData(NFT_SALES);
        const responseNftHolders = await fetchDuneData(NFT_HOLDERS);
        const responseNftTraders = await fetchDuneData(NFT_TRADERS);
        const responseNftFloorPrice = await fetchDuneData(NFT_FLOOR_PRICE);
        const responseMarketOverView = await fetchDuneData(MARKET_OVERVIEW_QUERY);
        const responseMarketStatistics = await fetchDuneData(MARKET_OVERVIEW_STATISTICS);

        //2. delete existing table entries
        await deleteNFTStats();
        await deleteNFTSales();
        await deleteNFTHolders();
        await deleteNFTTraders();
        await deleteNFTFloorPrice();
        await deleteMarketOverview();
        await deleteMarketAnalysis();

        //3 save in database
        await insertNFTStatsInBulk(responseNftStats.result.rows);
        await insertNFTSalesInBulk(responseNftSales.result.rows);
        await insertNFTHoldersInBulk(responseNftHolders.result.rows);
        await insertNFTTradersInBulk(responseNftTraders.result.rows);
        await insertNFTFloorPriceInBulk(responseNftFloorPrice.result.rows);
        await insertMarketOverviewInBulk(responseMarketOverView.result.rows);
        await insertMarketAnalysisInBluk(responseMarketStatistics.result.rows);

    }catch(error){
        throw error;
    }
}

  