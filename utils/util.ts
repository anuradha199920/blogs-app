'use server'
import {ImageLoaderProps} from "next/image";

export const grpahCMSImageLoader = ({src}: ImageLoaderProps) => {
    return src;
};