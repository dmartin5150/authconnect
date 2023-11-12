import React, {useState} from "react";
import Popup from "./popup/popup-component";
import classnames from "classnames";
import { AgGridReact } from 'ag-grid-react';
import { GridApi} from "ag-grid-community";
import { ColDef } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Order, ActionNote } from "../store/OrderTasks/orderTasks.types";


interface ShowHistoryProps {
    classIsOpen: boolean;
}


const ShowHistory: React.FC<ShowHistoryProps> = ({classIsOpen}) => {

    const handleSubmit = () => {

    }

    const [gridApi, setGridApi] = useState<GridApi | undefined>();
    const [rowData, setRowData] = useState<ActionNote[]>([]);
    const [columnDefs, setColDefs]=  useState<ColDef[]> ([
        {headerName: 'UserName', field: 'userName', flex:0.8},
        {headerName: 'timeStamp', field: 'timeStamp', flex:0.8},
        {headerName: 'Note', field: 'data', flex:0.6},
    ]);


    return (
    <Popup classIsOpen={classIsOpen}>
        <div className ={classnames("createnote",{open:classIsOpen ? 'open' : ''})}>
        <form className='createnote--form' onSubmit={handleSubmit}>
            <label>
                Order History:
            </label>

            <div className='createnote--buttons'>
                <button type="submit" value="Submit" className='createnote--button submit'>Close</button>
            </div>
        </form>
        </div>
    </Popup>)
}

export default ShowHistory