"use client"
import { fetchClients } from "@/utils";
import { Client, ClientCard } from "@/components";
import { useEffect, useState } from "react";

const Clients = ()=>{
    const [ clientsList, setClientsList] = useState<Client[]>();
    useEffect(()=>{
        fetchClients()
        .then((response)=>{
            setClientsList(response)
        })
        .catch(error=>{
            console.error(error);
        });
    },[])
    if(clientsList){
        return(
        <div className="w-full md:w-[98%] border-y-2 m-0 my-4 md:m-4 flex flex-wrap items-center justify-center">
            {clientsList.map(client=>(
                <ClientCard client={client} key={"client"+client.userName}/>
            ))}
        </div>);
    }else{
        return (
            <div>
                Loading...
            </div>
        );
    }
}
export default Clients;