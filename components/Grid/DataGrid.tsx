"use client"
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {TableProps} from '@/components';
import { ColDef } from 'ag-grid-community';

const convertTablePropsToMonthColumnDefs: ColDef[] = [
    { field: 'collection', headerName: 'Collection Name', minWidth: 150},
    { field: 'trade', headerName: 'Trade' },
    { field: 'monthSales', headerName: 'Month Sales' },
    { field: 'monthnftTraded', headerName: 'Month NFTs Traded' },
    { field: 'monthBuyers', headerName: 'Month Buyers'},
    { field: 'monthSellers', headerName: 'Month Sellers'},
    { field: 'monthVolume', headerName: 'Month Volume'},
    { field: 'monthWashVolume', headerName: 'Month Wash Volume'},
    { field: 'monthHighestSale', headerName: 'Month Highest Sale'},
    { field: 'supply', headerName: 'Supply' },
    { field: 'collectionAge', headerName: 'Collection Age', minWidth: 150 }
  ];

const convertTablePropsToDayColumnDefs: ColDef[] = [
    { field: 'collection', headerName: 'Collection Name', minWidth: 150},
    { field: 'trade', headerName: 'Trade' },
    { field: 'daySales', headerName: 'Day Sales' },
    { field: 'daynftTraded', headerName: 'Day NFTs Traded' },
    { field: 'dayBuyers', headerName: 'Day Buyers' },
    { field: 'daySellers', headerName: 'Day Sellers' },
    { field: 'dayVolume', headerName: 'Day Volume' },
    { field: 'dayWashVolume', headerName: 'Day Wash Volume' },
    { field: 'dayHighestSale', headerName: 'Day Highest Sale' },
    { field: 'supply', headerName: 'Supply' },
    { field: 'collectionAge', headerName: 'Collection Age', minWidth: 150 }
  ];

const convertTablePropsToWeekColumnDefs: ColDef[] = [
    { field: 'collection', headerName: 'Collection Name', minWidth: 150},
    { field: 'trade', headerName: 'Trade' },
    { field: 'daySales', headerName: 'Day Sales' },
    { field: 'weekSales', headerName: 'Week Sales'},
    { field: 'weeknftTraded', headerName: 'Week NFTs Traded' },
    { field: 'weekBuyers', headerName: 'Week Buyers'},
    { field: 'weekSellers', headerName: 'Week Sellers' },
    { field: 'weekVolume', headerName: 'Week Volume' },
    { field: 'weekWashVolume', headerName: 'Week Wash Volume' },
    { field: 'weekHighestSale', headerName: 'Week Highest Sale'},
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
              Day
            </button>
            <button className={`${value=="Week"? "dark:bg-boxdark shadow-card  bg-white": ""} rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`} onClick={handleButtonClick} value={"Week"}>
              Week
            </button>
            <button className={`${value=="Month"? "dark:bg-boxdark shadow-card  bg-white": ""} rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`} onClick={handleButtonClick} value={"Month"}>
              Month
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
                            flex: 1,
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