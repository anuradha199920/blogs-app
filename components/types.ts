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

export class MarketOverviewProps{
    highestSale: number | undefined;
    buyers: number | undefined;
    organicVolume: number | undefined;
    sales: number | undefined;
    sellers: number | undefined;
    time: string | undefined;
    washVolume: number | undefined;
    washVolumePercentage: number | undefined;
    constructor(highestSale: any, buyers: any, sellers: any, organicVolume: any, sales: any, time: any, washVolume: any, washVolumePercentage: any){
        this.highestSale =highestSale;
        this.buyers = buyers;
        this.sellers = sellers;
        this.sales = sales;
        this.time = time;
        this.organicVolume = organicVolume;
        this.washVolume = washVolume;
        this.washVolumePercentage =  washVolumePercentage;
    }
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

export interface TableProps {
    collection: string;
    collectionAge: string;
    dayBuyers: number;
    dayHighestSale: number;
    daySales: number;
    daySellers: number;
    dayVolume: number;
    dayWashVolume: number;
    daynftTraded: number;
    diamondHands: number;
    monthBuyers: number;
    monthHighestSale: number;
    monthSales: number;
    monthSellers: number;
    monthVolume: number;
    monthWashVolume: number;
    monthnftTraded: number;
    supply: number;
    trade: string;
    weekBuyers: number;
    weekHighestSale: number;
    weekSales: number;
    weekSellers: number;
    weekVolume: number;
    weekWashVolume: number;
    weeknftTraded: number;
  }