"use client"
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {TableProps} from '@/components';
import { ColDef } from 'ag-grid-community';

const convertTablePropsToMonthColumnDefs: ColDef[] = [
    { field: 'collection', headerName: 'Collection Name', minWidth: 150},
    { field: 'trade', headerName: 'Trade' },
    { field: 'monthSales', headerName: '30D Sales' },
    { field: 'monthnftTraded', headerName: '30D NFTs Traded' },
    { field: 'monthBuyers', headerName: '30D Buyers'},
    { field: 'monthSellers', headerName: '30D Sellers'},
    { field: 'monthVolume', headerName: '30D Volume'},
    { field: 'monthWashVolume', headerName: '30D Wash Volume'},
    { field: 'monthHighestSale', headerName: '30D Highest Sale'},
    { field: 'supply', headerName: 'Supply' },
    { field: 'collectionAge', headerName: 'Collection Age', minWidth: 150 }
  ];

const convertTablePropsToDayColumnDefs: ColDef[] = [
    { field: 'collection', headerName: 'Collection Name', minWidth: 150},
    { field: 'trade', headerName: 'Trade' },
    { field: 'daySales', headerName: ' 1D Sales' },
    { field: 'daynftTraded', headerName: ' 1D NFTs Traded' },
    { field: 'dayBuyers', headerName: ' 1D Buyers' },
    { field: 'daySellers', headerName: ' 1D Sellers' },
    { field: 'dayVolume', headerName: ' 1D Volume' },
    { field: 'dayWashVolume', headerName: ' 1D Wash Volume' },
    { field: 'dayHighestSale', headerName: ' 1D Highest Sale' },
    { field: 'supply', headerName: 'Supply' },
    { field: 'collectionAge', headerName: 'Collection Age', minWidth: 150 }
  ];

const convertTablePropsToWeekColumnDefs: ColDef[] = [
    { field: 'collection', headerName: 'Collection Name', minWidth: 150},
    { field: 'trade', headerName: 'Trade' },
    { field: 'weekSales', headerName: '7D Sales'},
    { field: 'weeknftTraded', headerName: '7D NFTs Traded' },
    { field: 'weekBuyers', headerName: '7D Buyers'},
    { field: 'weekSellers', headerName: '7D Sellers' },
    { field: 'weekVolume', headerName: '7D Volume' },
    { field: 'weekWashVolume', headerName: '7D Wash Volume' },
    { field: 'weekHighestSale', headerName: '7D Highest Sale'},
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
                        defaultColDef={{
                            filter: true,
                            filterParams: {
                                newRowsAction: 'keep'
                            },
                            menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
                        }}
                        columnDefs={columnDefs}
                        onGridReady={onGridReady}
                        rowData={rowData}
                        getRowId={data => data.data.collection}
                        sideBar={{
                        }}
                        containerStyle={{
                            
                        }}
                    />
            </div>
      </div>
           
        </div>
    );
};

export default DataGrid;