import { Client } from "@/components";
import Image from "next/image";
import Link from "next/link";

const ClientCard = ({client}:{client: Client}) =>{
    return (
        <div className="w-[200px] inline-block px-3 relative mt-10 " >
            <Link href={client.twitterLink}>
        <div className={`relative  align-middle w-[400pxcursor-pointer`}>                                        
            <div className="flex flex-wrap flex-col items-center sm:flex-nowrap sm:space-x-6" >
                <div className="relative mt-1 h-30 w-30 flex-shrink-0">  
                    <Image
                        src={client.profilePicture.url}
                        alt={client.userName}
                        fill
                        className="rounded-full object-cover fill"
                        sizes="96px"
                    />
                </div>
                <div className="mb-3 h-24 flex items-center">
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