import React, {useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { Order } from '../store/OrderTasks/orderTasks.types';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import AuthStatsDropdown from '../components/AuthStatusDropdown';



type Car = {
    make: string;
    model: string;
    price: number;
}

const MyTasks = () => {


    const onAuthChange = (authStatus:string) => {
        console.log(authStatus)
    }

    const [rowData, setRowData] = useState<Car[]>([]);

    const [columnDefs, setColDefs]=  useState<ColDef[]> ([
        {field: 'make'},
        {field: 'model'},
        {field: 'price'},
        {field: 'Auth Status', 
        cellRenderer:AuthStatsDropdown,
        cellRendererParams:{onAuthChange: onAuthChange}
    }
    ]);

    const defaultColDef:ColDef = {
        sortable:true,
        filter:true
    }

    return (
        <div className='ag-theme-alpine' style={{height: '500px'}}>
            <h1>MyTasks Page</h1>
            <AgGridReact 
                rowData={rowData} 
                columnDefs={columnDefs}
                defaultColDef={defaultColDef} 
                rowSelection='single'
            />
        </div>
    )
}
export default MyTasks;