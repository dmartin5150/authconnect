import React, {useState, useEffect} from "react";
import Popup from "./popup/popup-component";
import classnames from "classnames";
import { AgGridReact } from 'ag-grid-react';
import { GridApi} from "ag-grid-community";
import { ColDef } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ActionNote, ViewNoteInfo } from "../store/OrderTasks/orderTasks.types";
import {useSelector, useDispatch} from 'react-redux';
import { selectActionNotes, selectOrders, selectViewNotes } from "../store/OrderTasks/selectors/orderTasks.selector";
import { setViewNotes } from "../store/OrderTasks/actions/orderTasks.actions";
import { ICellRendererParams} from "ag-grid-community";
import './ShowHistory.css';

interface ShowHistoryProps {
    classIsOpen: boolean;
}


const ShowHistory: React.FC<ShowHistoryProps> = ({classIsOpen, ...props}) => {

    const viewNotes = useSelector(selectViewNotes);
    const orders = useSelector(selectOrders);
    const actionNotes = useSelector(selectActionNotes);
    const dispatch = useDispatch();

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const emptyViewNoteInfo :ViewNoteInfo = {orderId:-1, classIsOpen:false}
        dispatch(setViewNotes(emptyViewNoteInfo));
    }



    const [gridApi, setGridApi] = useState<GridApi | undefined>();
    const [rowData, setRowData] = useState<ActionNote[]>([]);
    const [columnDefs, setColDefs]=  useState<ColDef[]> ([
        {headerName: 'UserName', field: 'userName', flex:0.8},
        {headerName: 'timeStamp', field: 'timeStamp', flex:0.8},
        {headerName: 'Note', field: 'data', flex:0.6},
    ]);


    useEffect  (() => {
        const curActionNotes = actionNotes.filter((note) =>  note.orderId === viewNotes.orderId);
        setRowData(curActionNotes);
    },[orders, actionNotes]);

    const defaultColDef:ColDef = {
        sortable:false,
        filter:false,
        resizable:true,
        flex:1
    }

    return (
    <Popup classIsOpen={classIsOpen}>
        <div className ={classnames("viewhistory",{open:classIsOpen ? 'open' : ''})}>
        <form className='viewhistory--form' onSubmit={handleSubmit}>
            <div className="viewhistory--label">
                <label >
                    Order History
                </label>
            </div>
            <div className='ag-theme-alpine' style={{ height: '200px', width:'500px'}}>
                <AgGridReact 
                    rowData={rowData} 
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef} 
                    rowSelection='single'
                />
            </div>
            <div className='createnote--buttons'>
                <button type="submit" value="Submit" className='createnote--button submit'>Close</button>
            </div>
        </form>
        </div>
    </Popup>)
}

export default ShowHistory