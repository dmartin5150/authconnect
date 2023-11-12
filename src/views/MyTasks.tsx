import React, {useState, useEffect, useRef, useMemo} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { GridApi, GridReadyEvent, CellClickedEvent,CellValueChangedEvent, RowDataUpdatedEvent, ComponentStateChangedEvent, GetRowIdParams } from "ag-grid-community";
import { ColDef } from 'ag-grid-community';
import { Order, Patient } from '../store/OrderTasks/orderTasks.types';
import { useSelector } from "react-redux";
import {selectOrders } from "../store/OrderTasks/selectors/orderTasks.selector" 
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./MyTask.css";
import { PATIENTS } from '../Data/patientData';

import AuthStatsDropdown from '../components/AuthStatusDropdown';
import AddNote from '../components/AddNote';
import NoteHistory from '../components/NoteHistory';
import ScheduleStatsDropdown from '../components/ScheduleStatusDropdown';


const MyTasks = () => {


    const onAuthChange = (authStatus:string) => {
        console.log('AUTH CHANGE')
    }

    const [gridApi, setGridApi] = useState<GridApi | undefined>();
    const [rowData, setRowData] = useState<Order[]>([]);
    const [columnDefs, setColDefs]=  useState<ColDef[]> ([
        {headerName: '', field: 'priority', flex:0.2},
        {headerName: 'Name', field: 'orderName', flex:0.8},
        {headerName: 'Order Date', field: 'orderDate', flex:0.8},
        {headerName: 'Carrier', field: 'carrier', flex:0.6},
        {headerName: 'Patient', field: 'patientName', flex:0.8},
        {headerName: 'Auth Status', field: 'authStatus',flex:0.6,
            cellRenderer:AuthStatsDropdown,
            cellRendererParams:{onAuthChange: onAuthChange}},
        {headerName: 'Schedule Status', field: 'scheduleStatus',flex:0.7,
        cellRenderer:ScheduleStatsDropdown,
        cellRendererParams:{onAuthChange: onAuthChange}},
        {headerName: 'Last Updated', field: 'lastUpdated', flex:0.6},
        {headerName: 'Add Note',flex:0.6, cellRenderer:AddNote },
        {headerName: 'History', flex:0.4, cellRenderer:NoteHistory},
    ]);

    const curOrders = useSelector(selectOrders);


    useEffect (()=> {
        if (curOrders) {
            const ordersWithPatientName = curOrders.map((order) =>{
                const patientName = PATIENTS.filter(patient => patient.athenaId === order.patientId)
                if (patientName.length === 1) {
                    order.patientName = patientName[0].firstName + ' ' + patientName[0].lastName
                    console.log('pateintName', order.patientName);
                } 
                // console.log(order)
                return order;
            }) 
            setRowData(ordersWithPatientName)
        }
    },[curOrders])


    const defaultColDef:ColDef = {
        sortable:false,
        filter:false,
        resizable:true,
        flex:1
    }

    useEffect(() => {
        console.log(gridApi)
        if (gridApi) {
            console.log('resizing columns')
          gridApi.sizeColumnsToFit();
        }
      }, [gridApi]);


      const getRowId = useMemo(() => {
        return (params:GetRowIdParams) => params.data.id;
      }, []);

      const gridOptions = {
        // Add event handlers
        // onCellClicked: (event: CellClickedEvent) => console.log('cell event', event),
        onCellValueChanged: (event:CellValueChangedEvent) => console.log('cell value', event)
        // onComponentStateChanged: (event: ComponentStateChangedEvent) =>console.log('component changed event', event),
        // getRowId: (params:GetRowIdParams) => params.data.id as string,
    }

    const handleRowUpdated = (event:RowDataUpdatedEvent) => {
        console.log(event);
    }

    const handleComponentChanged = (event:ComponentStateChangedEvent) => {
        console.log('component changed', event);
    }

    return (
        <div className='ag-theme-alpine' style={{height: '500px'}}>
            <h1>MyTasks Page</h1>
            <AgGridReact 
                rowData={rowData} 
                columnDefs={columnDefs}
                defaultColDef={defaultColDef} 
                rowSelection='single'
                gridOptions={gridOptions}
                getRowId={getRowId}
                onRowDataUpdated={handleRowUpdated}
                onComponentStateChanged={handleComponentChanged}
            />
        </div>
    )
}
export default MyTasks;