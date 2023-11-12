import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import { GridApi} from "ag-grid-community";
import { ColDef } from 'ag-grid-community';
import { Order, Patient, ScheduleStatusType } from '../store/OrderTasks/orderTasks.types';
import { useSelector } from "react-redux";
import {selectOrders } from "../store/OrderTasks/selectors/orderTasks.selector" 
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./MyTask.css";
import { PATIENTS } from '../Data/patientData';
import { AuthStatusType } from '../store/OrderTasks/orderTasks.types';

import AuthStatsDropdown from '../components/AuthStatusDropdown';
import AddNote from '../components/AddNote';
import NoteHistory from '../components/NoteHistory';
import ScheduleStatsDropdown from '../components/ScheduleStatusDropdown';
import { setOrders } from '../store/OrderTasks/actions/orderTasks.actions';


const MyTasks = () => {

    const curOrders = useSelector(selectOrders);
    const dispatch = useDispatch();



    
    const onAuthChange = (rowIndex: number, authStatus:AuthStatusType) => {
        const curOrder = curOrders[rowIndex];
        curOrder.authStatus = authStatus;
        dispatch(setOrders([...curOrders, curOrder]));
    }

    const onScheduleChange = (rowIndex: number, schedulingStatus:ScheduleStatusType) => {
        console.log('rI', rowIndex, schedulingStatus);
        const curOrder = curOrders[rowIndex];
        curOrder.scheduleStatus = schedulingStatus;
        dispatch(setOrders([...curOrders, curOrder]));
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
        cellRendererParams:{onScheduleChange: onScheduleChange}},
        {headerName: 'Last Updated', field: 'lastUpdated', flex:0.6},
        {headerName: 'Add Note',flex:0.6, cellRenderer:AddNote },
        {headerName: 'History', flex:0.4, cellRenderer:NoteHistory},
    ]);




    useEffect (()=> {
        if (curOrders) {
            const ordersWithPatientName = curOrders.map((order) =>{
                const patientName = PATIENTS.filter(patient => patient.athenaId === order.patientId)
                if (patientName.length === 1) {
                    order.patientName = patientName[0].firstName + ' ' + patientName[0].lastName
                } 
                return order;
            }) 
            setRowData(ordersWithPatientName)
        }
    },[])


    const defaultColDef:ColDef = {
        sortable:false,
        filter:false,
        resizable:true,
        flex:1
    }

    useEffect(() => {
        if (gridApi) {
            console.log('resizing columns')
          gridApi.sizeColumnsToFit();
        }
      }, [gridApi]);




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