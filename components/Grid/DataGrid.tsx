"use client"
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {TableProps} from '@/components';
import { ColDef, ValueFormatterParams } from 'ag-grid-community';

const convertTablePropsToMonthColumnDefs: ColDef[] = [
    { field: 'collection', headerName: 'Collection Name', minWidth: 200},
    { field: 'trade', headerName: 'Trade',cellRenderer: (params: ValueFormatterParams) => {
        return <div dangerouslySetInnerHTML={{ __html: params.value }} />;
  } },
    { field: 'monthSales', headerName: '30D Sales',  wrapHeaderText: true, autoHeaderHeight: true },
    { field: 'monthnftTraded', headerName: '30D NFTs Traded',  wrapHeaderText: true },
    { field: 'monthBuyers', headerName: '30D Buyers',  wrapHeaderText: true},
    { field: 'monthSellers', headerName: '30D Sellers',  wrapHeaderText: true},
    { field: 'monthVolume', headerName: '30D Volume',valueFormatter:(params: ValueFormatterParams)=>(`${(params.value/1000000).toFixed(2)}M`) },
    { field: 'monthWashVolume', headerName: '30D Wash Volume', valueFormatter:(params: ValueFormatterParams)=>(`${(params.value/1000).toFixed(2)}K`)},
    { field: 'monthHighestSale', headerName: '30D Highest Sale', valueFormatter:(params: ValueFormatterParams)=>(params.value?? 0).toFixed(2)},
    { field: 'diamondHands', headerName: 'Diamond Hands',valueFormatter:(params: ValueFormatterParams)=>(`${(params.value?? 0).toFixed(2)}%`)},
    { field: 'supply', headerName: 'Supply' },
    { field: 'collectionAge', headerName: 'Collection Age', minWidth: 150 }
  ];

const convertTablePropsToDayColumnDefs: ColDef[] = [
    { field: 'collection', headerName: 'Collection Name', minWidth: 200},
    { field: 'trade', headerName: 'Trade',
        cellRenderer: (params: ValueFormatterParams) => {
            return <div dangerouslySetInnerHTML={{ __html: params.value }} />;
      } },
    { field: 'daySales', headerName: ' 1D Sales', wrapHeaderText: true , autoHeaderHeight: true},
    { field: 'daynftTraded', headerName: ' 1D NFTs Traded',  wrapHeaderText: true, autoHeaderHeight: true },
    { field: 'dayBuyers', headerName: ' 1D Buyers',  wrapHeaderText: true },
    { field: 'daySellers', headerName: ' 1D Sellers',  wrapHeaderText: true},
    { field: 'dayVolume', headerName: ' 1D Volume', valueFormatter:(params: ValueFormatterParams)=>(`${(params.value/1000).toFixed(2)}K`)},
    { field: 'dayWashVolume', headerName: ' 1D Wash Volume' ,valueFormatter:(params: ValueFormatterParams)=>(`${(params.value/1000).toFixed(2)}K`)},
    { field: 'dayHighestSale', headerName: ' 1D Highest Sale',valueFormatter:(params: ValueFormatterParams)=>(params.value?? 0).toFixed(2) },
    { field: 'diamondHands', headerName: 'Diamond Hands', valueFormatter:(params: ValueFormatterParams)=>(`${(params.value?? 0).toFixed(2)}%`)},
    { field: 'supply', headerName: 'Supply' },
    { field: 'collectionAge', headerName: 'Collection Age', minWidth: 150 }
  ];

const convertTablePropsToWeekColumnDefs: ColDef[] = [
    { field: 'collection', headerName: 'Collection Name', minWidth: 200, wrapText: true},
    { field: 'trade', headerName: 'Trade', cellRenderer: (params: ValueFormatterParams) => {
        return <div dangerouslySetInnerHTML={{ __html: params.value }} />;
  } },
    { field: 'weekSales', headerName: '7D Sales',  wrapHeaderText: true},
    { field: 'weeknftTraded', headerName: '7D NFTs Traded',  wrapHeaderText: true },
    { field: 'weekBuyers', headerName: '7D Buyers',  wrapHeaderText: true},
    { field: 'weekSellers', headerName: '7D Sellers',  wrapHeaderText: true},
    { field: 'weekVolume', headerName: '7D Volume', valueFormatter:(params: ValueFormatterParams)=>(`${(params.value/1000).toFixed(2)}K`) },
    { field: 'weekWashVolume', headerName: '7D Wash Volume', valueFormatter:(params: ValueFormatterParams)=>(`${(params.value/1000).toFixed(2)}K`) },
    { field: 'weekHighestSale', headerName: '7D Highest Sale', valueFormatter:(params: ValueFormatterParams)=>(params.value??0).toFixed(2)},
    { field: 'diamondHands', headerName: 'Diamond Hands', valueFormatter:(params: ValueFormatterParams)=>(`${(params.value?? 0).toFixed(2)}%`)},
    { field: 'supply', headerName: 'Supply' },
    { field: 'collectionAge', headerName: 'Collection Age', minWidth: 150 }
  ];

const  DataGrid = ({props}:{props: TableProps[]}) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(props);
    const [columnDefs, setColumnDefs] = useState(convertTablePropsToDayColumnDefs);
    const[value, setValue] = useState("Day");
    const onGridReady = (params: any) => {
        params.api.sizeColumnsToFit();
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    const handleButtonClick = (e: any)=>{
        setValue(e.target.value);
        if(e.target.value === "Day"){
            setColumnDefs(convertTablePropsToDayColumnDefs)
        }else if(e.target.value === "Week"){
            setColumnDefs(convertTablePropsToWeekColumnDefs)
        }else{
            setColumnDefs(convertTablePropsToMonthColumnDefs)
        }
    }
    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-[#E4E3D8] px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 h-[80vh] w-full">
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
                        <button className={`${value=="Month"? "dark:bg-boxdark shadow-card  bg-white": ""} rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`} onClick={handleButtonClick} value={"Month"}>
                        30D
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full h-[90%]">
                <div
                id="myGrid"
                className="ag-theme-alpine"
                style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor:"#E4E3D8"
                }}
            >
                <AgGridReact
                    gridOptions={
                       { getRowStyle: (params) => {
                            return {
                                outerWidth: '100%'
                            };
                            },
                        }}
                    defaultColDef={{
                        filter: true,
                        wrapHeaderText: true,
                        wrapText: true,
                        filterParams: {
                            newRowsAction: 'keep'
                        },
                        autoHeaderHeight: true,
                        menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
                    }}
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                    rowData={rowData}
                    getRowId={data => data.data.collection}
                    onNewColumnsLoaded={(params)=>params.api.sizeColumnsToFit()}
                />
            </div>
        </div>
    </div>
    );
};

export default DataGrid;