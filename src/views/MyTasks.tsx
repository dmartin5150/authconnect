import React, {useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import AuthStatsDropdown from '../components/AuthStatusDropdown';



type Car = {
    make: string;
    model: string;
    price: number;
}

const carArray: Car[] = [ 
    {make: 'Ford', model: 'Shelby', price:50000},
    {make: 'Ford', model: 'Mustang', price:35000},
    {make: 'Chevy', model: 'Camaro', price:40000},
]
const MyTasks = () => {


    const onAuthChange = (authStatus:string) => {
        console.log(authStatus)
    }

    const [rowData, setRowData] = useState<Car[]>(carArray);

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