import { createContext } from "react";

interface ContextProps {
    dataList: any[];
    filteredData: any[];
    setFilteredData: React.Dispatch<React.SetStateAction<any[]>>;
    handleClick: (months: number) => void;
    isLoading: boolean;
    setFormattedData: (data: any[])=>void;
  }
  
const TimeFilterContext = createContext<ContextProps | undefined>(undefined);
export default TimeFilterContext;