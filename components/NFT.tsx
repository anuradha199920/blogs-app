"use client"
import { useNft } from "use-nft";
import Image from "next/image";


export default function NFT({contractAddress, tokenId}:{contractAddress: string, tokenId: string}) {
    const { loading, error, nft } = useNft(contractAddress,tokenId)
  
    // nft.loading is true during load.
    if (loading) return <>Loading…</>
  
    // nft.error is an Error instance in case of error.
    if (error || !nft) return <>Error.</>
  
    // You can now display the NFT metadata.
    return (
        <div className="h-5 w-5">
            <img alt={contractAddress} loading="lazy" decoding="async" data-nimg="fill" className="object-cover bg-transparent h-full w-full absolute inset-0" sizes="100vw" src={nft.image} />
        </div>)
  }