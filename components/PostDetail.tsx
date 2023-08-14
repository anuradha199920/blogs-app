"use client"
import React from "react";
import {
    Post,
    HeadingNode,
    ImageNode,
    ParagraphNode,
    TextNode,
    LinkNode,
    CodeBlockNode
} from "@/components/types";
import moment from "moment";
import Link from 'next/link';
import  TweetEmbed  from "react-tweet-embed";


export default function PostDetail({post}: {post: Post}){

    const getFormattedText = (textNode: TextNode, index: string)=>{
        let modifiedText = (<React.Fragment key={index+"text"}>{textNode.text}</React.Fragment>);
        if("bold" in textNode && textNode.bold){
            modifiedText = (<b key={index+"bold"}>{modifiedText}</b>);
        }
        if("italic" in textNode && textNode.italic){
            modifiedText = (<em key={index+"italic"}>{modifiedText}</em>);
        }
        if("underline" in textNode && textNode.underline){
            modifiedText = (<u key={index+"underline"}>{modifiedText}</u>);
        }
        if("code" in textNode && textNode.code){
            //todo:add code
        }
        return modifiedText;
    }

    const getFragements = (obj: (TextNode | LinkNode)[] , index: number)=>{
        return obj.map(
            (child, i)=>{
                if("type" in child  && child.type =='link'){
                    return (
                        <Link className="text-indigo-900 font-extrabold underline hover:text-indigo-950" href={child.href} key={index+""+i} target={child.openInNewTab ? "_blank":"_self"}>
                           {child.children.map((linkChild, j)=>{
                            return <span key={index+i+j+""}>{getFormattedText(linkChild, index+i+j+"")}</span>
                           })}
                        </Link>
                    )
                }else if("text" in child){
                    return <React.Fragment key={index+i+""}> {getFormattedText(child, index+i+"")} </React.Fragment>
                }
        })
    }
    function isImageNode(node: any): node is ImageNode {
        return node && typeof node.src === 'string' && node.type === 'image';
    }
    
    function isHeadingNode(node: any): node is HeadingNode {
        return node && (node.type === 'heading-three' || node.tye === 'heading-four');
    }

    function isParagraphNode(node: any): node is ParagraphNode {
        return node && node.type === 'paragraph';
    }

    function isCodeBlockNode(node: any): node is CodeBlockNode {
        return node && node.type === 'code-block';
    }

    const getContentFragment = (obj: HeadingNode | ParagraphNode | CodeBlockNode | ImageNode, index: number) => {
        switch (obj.type) {
            
            case 'heading-three':
                {if(isHeadingNode(obj)) {
                    return (<h3 className="text-xl font-semibold mb-4" key={index}>{getFragements(obj.children, index)}</h3>)
                }}
            case 'heading-four':
                if(isHeadingNode(obj)){
                    return (<h4 className="text-md font-semibold mb-4" key={index}>{getFragements(obj.children, index)}</h4>)
                }
            case 'paragraph':
                if(isParagraphNode(obj)){
                    return (<p className="mb-4 break-words " key={index}>{getFragements(obj.children, index)}</p>);
                }
            case 'code-block':
                if(isCodeBlockNode(obj)){
                    return <div className="my-8 w-200 min-h-[40vh]" key={index}>                        
                        <TweetEmbed 
                            className="w-full" 
                            tweetId={obj.children[0].text} 
                            placeholder={'loading...'} 
                            options={{theme: 'dark', align:'center', conversation: 'none'}}
                            />
                    </div>}
            case 'image':
                {if(isImageNode(obj)){
                    return (<div className="mb-8 mt-8 w-full flex justify-center" key={index}>
                            <img 
                            src={obj.src} 
                            width={obj.width} 
                            height={obj.height} 
                            key={index}
                            className="hover:relative z-10 transform transition-transform duration-500  hover:scale-100"
                            />
                        </div>)
                }}
            default:
                return (<>Not valid</>);
        }
    };
    
    return(
        <div className="container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8">
            <div className="px-4 lg:px-0 w-full">
                {post.content.json.children.map(getContentFragment)}
            </div>
        </div>
    );
}