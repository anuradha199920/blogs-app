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

export interface Client {
    userName: string;
    twitterLink: string;
    profilePicture: {
        url:string
    }
}