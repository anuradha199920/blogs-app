"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react';
import {NFTStats} from '@/components';
import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import Image from "next/image"


const convertTablePropsToDayColumnDefs: ColDef[] = [
    { field: 'imageUrl', headerName: ' ', cellRenderer: (params: ValueFormatterParams) => {
        if(params.value != null) {
            return (
                <div className="relative h-16 w-16 flex-shrink-0">
                    <Image alt={"not avaialble"} loading="lazy" decoding="async" data-nimg="fill" className="rounded-full object-cover bg-transparent h-full w-full absolute inset-0" sizes="100vw" src={params.value} width={'100'} height={'100'}/>
                </div>
            )
        }else{
            return "Not available"
        }
    } },
    { field: 'collection', headerName: 'Collection Name', minWidth: 200},
    { field: 'trade', headerName: 'Trade',
        cellRenderer: (params: ValueFormatterParams) => {
            return <div dangerouslySetInnerHTML={{ __html: params.value }} />;
      } },
    
    { field: 'daySales', headerName: ' 1D Sales', wrapHeaderText: true , autoHeaderHeight: true, sortable: true},
    { field: 'daynftTraded', headerName: ' 1D NFTs Traded',  wrapHeaderText: true, autoHeaderHeight: true, sortable: true },
    { field: 'dayBuyers', headerName: ' 1D Buyers',  wrapHeaderText: true , sortable: true},
    { field: 'daySellers', headerName: ' 1D Sellers',  wrapHeaderText: true, sortable: true},
    { field: 'dayVolume', headerName: ' 1D Volume', valueFormatter:(params: ValueFormatterParams)=>(`${(params.value??0).toFixed(2)}K`), sortable: true},
    { field: 'dayWashVolume', headerName: ' 1D Wash Volume' ,valueFormatter:(params: ValueFormatterParams)=>(`${(params.value??0).toFixed(2)}K`), sortable: true},
    { field: 'dayHighestSale', headerName: ' 1D Highest Sale',valueFormatter:(params: ValueFormatterParams)=>(params.value?? 0).toFixed(2) , sortable: true},
    { field: 'dayLowestSale', headerName: ' 1D Lowest Sale',valueFormatter:(params: ValueFormatterParams)=>(params.value?? 0).toFixed(2) , sortable: true},
];

const convertTablePropsToWeekColumnDefs: ColDef[] = [
    { field: 'imageUrl', headerName: ' ', cellRenderer: (params: ValueFormatterParams) => {
        return params.value;
    } },
    { field: 'collection', headerName: 'Collection Name', minWidth: 200, wrapText: true},
    { field: 'trade', headerName: 'Trade', cellRenderer: (params: ValueFormatterParams) => {
        return <div dangerouslySetInnerHTML={{ __html: params.value }} />;
    } },
    { field: 'weekSales', headerName: '7D Sales',  wrapHeaderText: true, sortable: true},
    { field: 'weeknftTraded', headerName: '7D NFTs Traded',  wrapHeaderText: true, sortable: true },
    { field: 'weekBuyers', headerName: '7D Buyers',  wrapHeaderText: true, sortable: true},
    { field: 'weekSellers', headerName: '7D Sellers',  wrapHeaderText: true, sortable: true},
    { field: 'weekVolume', headerName: '7D Volume', valueFormatter:(params: ValueFormatterParams)=>(`${(params.value??0).toFixed(2)}K`), sortable: true },
    { field: 'weekWashVolume', headerName: '7D Wash Volume', valueFormatter:(params: ValueFormatterParams)=>(`${(params.value??0).toFixed(2)}K`) , sortable: true},
    { field: 'weekHighestSale', headerName: '7D Highest Sale', valueFormatter:(params: ValueFormatterParams)=>(params.value??0).toFixed(2), sortable: true},
    { field: 'weekLowestSale', headerName: '7D Lowest Sale', valueFormatter:(params: ValueFormatterParams)=>(params.value??0).toFixed(2), sortable: true},
];


const  DataGrid = ({props}:{props: NFTStats[]}) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(props);
    const [columnDefs, setColumnDefs] = useState(convertTablePropsToDayColumnDefs);
    const [value, setValue] = useState("Day");
    const router = useRouter();
    const onGridReady = (params: any) => {
        params.api.sizeColumnsToFit();
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    const onRowClicked = (event: any) => {
        const rowData = event.data;
        const rowDataString = JSON.stringify(rowData);
    
        // Encode the string to ensure it's safe for URL passage
        const encodedRowData = encodeURIComponent(rowDataString);
    
        router.push(`/collection/${rowData.collection}?data=${encodedRowData}`);
    }
    const handleButtonClick = (e: any)=>{
        setValue(e.target.value);
        if(e.target.value === "Day"){
            setColumnDefs(convertTablePropsToDayColumnDefs)
        }else if(e.target.value === "Week"){
            setColumnDefs(convertTablePropsToWeekColumnDefs)
        }
    }
    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-[#e4e3d800] px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 h-[80vh] w-full">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                    <div className="flex min-w-47.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                            NFT Market Stats
                    </h4>
                    </div>
                </div>
                <div className="flex w-full max-w-45 justify-end">
                    <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
                        <button className={`${value=="Day"? "dark:bg-boxdark shadow-card  bg-white": ""} rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`} onClick={handleButtonClick} value={"Day"}>
                        1D
                        </button>
                        <button className={`${value=="Week"? "dark:bg-boxdark shadow-card  bg-white": ""} rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`} onClick={handleButtonClick} value={"Week"}>
                        7D
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full h-[90%]">
                <div
                id="myGrid"
                className="ag-theme-alpine shadow-md"
                style={{
                    height: '100%',
                    width: '100%',
                }}
            >
                <AgGridReact
                    defaultColDef={{
                        minWidth: 100,
                        filter: true,
                        wrapHeaderText: true,
                        wrapText: true,
                        filterParams: {
                            newRowsAction: 'keep'
                        },
                        autoHeaderHeight: true,
                        menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],
                    }}
                    rowHeight={70}
                    onRowClicked={onRowClicked}
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                    rowData={rowData}
                    getRowId={data => data.data.collection}        
                    onColumnValueChanged={(params=>params.api.sizeColumnsToFit())}/>
            </div>
        </div>
    </div>
    );
};

export default DataGrid;