import { Client } from "@/components";
import Image from "next/image";
import Link from "next/link";

const ClientCard = ({client}:{client: Client}) =>{
    return (
        <div className="w-[100px] md:w-[100px] inline-block px-0 md:px-3 relative mt-2 mx-0 md:mx-5" >
            <Link href={client.twitterLink}>
            <div className={`relative align-middle w-full cursor-pointer`}>                                        
            <div className="flex flex-wrap flex-col items-center sm:flex-nowrap sm:space-x-6" >
                <div className="relative mt-1 h-30 w-30 flex-shrink-0 mb-0">  
                    <Image
                        src={client.profilePicture.url}
                        alt={client.userName}
                        fill
                        className="rounded-full object-cover fill"
                        sizes="96px"
                    />
                </div>
                <div className=" h-24 flex items-center mt-0 py-0">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-300">
                        {client.userName}
                    </h3>
                </div>
            </div>
            </div>
            </Link>
        </div>);
}

export default ClientCard;