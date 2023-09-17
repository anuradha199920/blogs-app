export interface FeaturedImage {
    url: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface Author {
    bio: string;
    id: string;
    name: string;
    profilePicture: {
        url: string;
    };
}
export interface Comment {
    name: string;
    email: string;
    comment: string;
}
export interface Post {
    id: string;
    title: string;
    slug: string;
    readTime: string;
    createdAt: string;
    featuredImage: FeaturedImage;
    categories: Category[];
    author: Author;
    content: {
        json: {
            children:  (HeadingNode | ParagraphNode | ImageNode)[];
        };
    };
    comments: Comment[]
}

export interface DuneDashboard{
    name: string;
    slug: string;
    featuredImage: FeaturedImage;
    dunegraphs?: {
        src: string;
    }[];
}

export interface PostEdge {
    node: Post;
}

export interface PostsConnection {
    edges: PostEdge[];
}

export interface TextNode {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    code?: boolean;
}
  
export interface LinkNode {
    href: string;
    type: string;
    children: TextNode[];
    openInNewTab?: boolean;
}

export interface IFramesNode {
    url: string;
    type: string;
    title: string;
    width: number;
    height: number;
    children: TextNode[];
}
  
export interface ImageNode {
    src: string;
    type: string;
    title: string;
    width: number;
    handle: string;
    height: number;
    mimeType: string;
}

export interface CodeBlockNode{
    type: string;
    children: TextNode[];
}

export interface ParagraphNode {
    type: string;
    children: (TextNode | LinkNode)[];
}

export interface HeadingNode {
    type: string;
    children: TextNode[];
}

export interface MarketOverviewProps{
    highestSale: number;
    buyers: number;
    organicVolume: number;
    sales: number;
    sellers: number;
    time: string;
    washVolume: number;
    washVolumePercentage: number;
}

export interface MarketStatisticsProps{
    buyers: number;
    eth0: number;
    eth1: number;
    eth2: number;
    sales: number;
    sellers: number;
    time: string;
    volume: number;
}

export interface AreaChartState {
    series: {
      name: string;
      data: {
        x: string;
        y: number;
      }[];
    }[];
  }

export interface BarChartState {
    series: {
        name: string;
        data: {
            x: string;
            y: number;
        }[];
    }[];
}

export interface NFTStats {
    collection: string;
    nftContractAddress: string;
    tokenId: string;
    imageUrl: string;
    dayBuyers: number;
    dayHighestSale: number;
    dayLowestSale: number;
    daySales: number;
    daySellers: number;
    dayVolume: number;
    dayWashVolume: number;
    daynftTraded: number;
    trade: string;
    weekBuyers: number;
    weekHighestSale: number;
    weekLowestSale: number;
    weekSales: number;
    weekSellers: number;
    weekVolume: number;
    weekWashVolume: number;
    weeknftTraded: number;
    totalnftTraded: number;
    nftSales: NFTSales[];
    nftFloorPrice: NFTFloorPrice[];
    nftTraders: NFTTraders[];
    nftHolders: NFTHolders[]; 
}

export interface NFTSales {
    amountOriginal: number;
    nftStats?: NFTStats;
    nftContractAddress: string;
    tokenId: string;
    imageUrl: string;
    name?: string;
}
  
export interface NFTFloorPrice {
    nftStats?: NFTStats;
    nftContractAddress: string;
    day: string;
    floor: number;
    name?: string;
}
  
export interface NFTTraders {
    traderAddress: string;
    nftStats?: NFTStats;
    nftContractAddress: string;
    weekTrades: number;
    weekVolume: number;
    name?: string;
    a_ranking: number;
}
  
export interface NFTHolders {
    nftStats?: NFTStats;
    nftContractAddress: string;
    holder: string;
    lastAquisitionTime: string;
    lastShedTime: string;
    heldCount: number;
    name?: string;
    amountMinted: number;
}
  
export interface BidsPercentage {
    time: string;
    bidsPercentage: number;
}

export interface Client {
    userName: string;
    twitterLink: string;
    profilePicture: {
        url:string
    }
}