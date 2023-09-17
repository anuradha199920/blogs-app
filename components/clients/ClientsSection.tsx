import {Clients} from "@/components";

const ClientsSection: React.FC = () => {
    return (
        <>
        <div className="px-0 md:px-2 py-2 xl:px-10 mx-0 md:mx-6 w-full flex flex-col items-center justify-center mt-10">
            <div className="w-full flex items-center justify-center">
                <h2 className="text-3xl font-semibold stylish-font text-[#3C61BD] lg:text-4xl lg:leading-tight tracking-tighter">
                    Clients
                </h2>
            </div>
            <Clients />
        </div>  
        </>
    );
};
export default ClientsSection;