import { request, gql } from 'graphql-request'
import {Category, NFTHolders, Post, PostsConnection, NFTSales, NFTTraders, NFTFloorPrice, MarketOverviewProps, MarketStatisticsProps, DuneDashboard} from "@/components";
import prisma from '../lib/prisma';
import { NFTStats } from '@/components';
import { BidsPercentage } from '@prisma/client';
import { fetchNFTImages } from './quickNode';
export {fetchNFTImages} from './quickNode';


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
}

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

export async function deleteBidsPercentage(){
    try {
        const deleteResult = await prisma.bidsPercentage.deleteMany({});
        console.log(`${deleteResult.count} BidsPercentage records deleted.`);
    } catch (error) {
        console.error('Error deleting BidsPercentage:', error);
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

export async function insertBidsPercentage(bidsPercentage: BidsPercentage[]){
    try{
        const result  = await prisma.$transaction([
            prisma.bidsPercentage.createMany({
                data: bidsPercentage,
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

export async function insertImages() {
    try {
        const val = await prisma.nFTStats.findMany({
            select: {
                nftContractAddress: true,
                tokenId: true
            }
        });

        for (const element of val) {
            const nftImage = await fetchNFTImages(element.nftContractAddress, element.tokenId);
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1000 milliseconds = 1 second
            console.log("saving nft : "+nftImage)
            const result  = await prisma.$transaction([
                prisma.nFTStats.update({
                    where:{
                        nftContractAddress: element.nftContractAddress,
                        tokenId: element.tokenId
                    },data:{
                        imageUrl: nftImage
                    }
                })
            ])
        }
    } catch (error) {
        console.error('Error fetching NFT stats:', error);
    }
}





export async function refershDatabase(){
    try{
        //1. fetch data from dune api
        // const responseNftStats = await fetchDuneData(TABLE_QUERY);
        // const responseNftSales = await fetchDuneData(NFT_SALES);
        // const responseNftFloorPrice = await fetchDuneData(NFT_FLOOR_PRICE);
        // const responseMarketOverView = await fetchDuneData(MARKET_OVERVIEW_QUERY);
        // const responseMarketStatistics = await fetchDuneData(MARKET_OVERVIEW_STATISTICS);
        // const bidsPercentage = await fetchDuneData(BIDS_PERCENTAGE);

        // //2. delete existing table entries
        // await deleteNFTStats();
        // await deleteNFTSales();
        // await deleteNFTFloorPrice();
        // await deleteMarketOverview();
        // await deleteMarketAnalysis();
        // await deleteBidsPercentage();

        // //3 save in database
        // await insertNFTStatsInBulk(responseNftStats.result.rows);
        // await insertNFTSalesInBulk(responseNftSales.result.rows);
        // await insertNFTFloorPriceInBulk(responseNftFloorPrice.result.rows);
        // await insertMarketOverviewInBulk(responseMarketOverView.result.rows);
        // await insertMarketAnalysisInBluk(responseMarketStatistics.result.rows);
        // await insertBidsPercentage(bidsPercentage.result.rows);
        await insertImages();

    }catch(error){
        throw error;
    }
}


export async function getMarketAnalysis(){
    try{
        const result = await prisma.marketAnalysis.findMany({});
        return result;
    }catch(error){
        console.error("Error occurred while performing fetch marketAnalysis Query: ", error);
        throw error;
    }finally{
        await prisma.$disconnect();
    }
}

export async function getMarketOverview(){
    try{
        const result = await prisma.marketOverview.findMany({});
        return result;
    }catch(error){
        console.error("Error occurred while performing fetch marketOverview Query: ", error);
        throw error;
    }finally{
        await prisma.$disconnect();
    }
}
  
export async function getBidsPercentageVolume(){
    try{
        const result = await prisma.bidsPercentage.findMany({});
        return result;
    }catch(error){
        console.error("Error occurred while performing fetch bids percentage Query: ", error);
        throw error;
    }finally{
        await prisma.$disconnect();
    }
}

export async function getNFTStats(){
    try{
        const result = await prisma.nFTStats.findMany({});
        return result;
    }catch(error){
        console.error("Error occurred while performing fetch nft stats Query: ", error);
        throw error;
    }finally{
        await prisma.$disconnect();
    }
}
// export 