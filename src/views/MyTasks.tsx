import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import { GridApi} from "ag-grid-community";
import { ColDef } from 'ag-grid-community';
import { Order, ScheduleStatusType,ActionNote, CreateNoteInfo,ViewNoteInfo, StatusUpdateInfo, StatusUpdateTypes } from '../store/OrderTasks/orderTasks.types';
import { useSelector } from "react-redux";
import {selectOrders,selectCreateNoteOpen, selectViewNotes, selectUser, selectActionNotes, selectStatusUpdate } from "../store/OrderTasks/selectors/orderTasks.selector" 
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./MyTask.css";
import { PATIENTS } from '../Data/patientData';
import { AuthStatusType } from '../store/OrderTasks/orderTasks.types';
import AuthStatsDropdown from '../components/AuthStatusDropdown';
import AddNote from '../components/AddNote';
import ShowHistory from '../components/ShowHistory';
import NoteHistory from '../components/NoteHistory';
import ViewHistory from '../components/ViewHistory';
import ScheduleStatsDropdown from '../components/ScheduleStatusDropdown';
import { setOrders, setCreateNoteOpen, setViewNotes, setActionNotes,setStatusUpdate } from '../store/OrderTasks/actions/orderTasks.actions';
import CreateNote from '../components/CreateNote';


const MyTasks = () => {

    const curOrders = useSelector(selectOrders);
    const noteInfo = useSelector(selectCreateNoteOpen);
    const viewInfo = useSelector(selectViewNotes);
    const curUser = useSelector(selectUser);
    const actionNotes = useSelector(selectActionNotes);
    const statusUpdate = useSelector(selectStatusUpdate);
    const dispatch = useDispatch();



    useEffect(() => {
        if (statusUpdate.rowIndex !== -1){
            const orderId = curOrders[statusUpdate.rowIndex].id;
            const now = new Date();
            const note = `Order ${statusUpdate.type} Status changed to ${statusUpdate.status}`;
            const newNote:ActionNote = {orderId, userName:curUser.userName, data:note, timeStamp:now};
            console.log('action notes', actionNotes);
            dispatch(setActionNotes([...actionNotes, newNote]))
            const newOrder = curOrders[statusUpdate.rowIndex]
            newOrder.lastUpdated = now;
            dispatch(setOrders([...curOrders, newOrder]));
        }
    },[statusUpdate])

    
    // const createActionNote = (authType:string, rowIndex:number, newStatus: AuthStatusType | ScheduleStatusType) => {
    //     const orderId = curOrders[rowIndex].id;
    //     const now = new Date();
    //     const note = `Order ${authType} Status changed to ${newStatus}`;
    //     const newNote:ActionNote = {orderId, userName:curUser.userName, data:note, timeStamp:now};
    //     console.log('action notes', actionNotes);
    //     dispatch(setActionNotes([...actionNotes, newNote]))
    //     const newOrder = curOrders[rowIndex]
    //     newOrder.lastUpdated = now;
    //     dispatch(setOrders([...curOrders, newOrder]));
    // }

    
    const onAuthChange = (rowIndex: number, authStatus:AuthStatusType) => {
        const curOrder = curOrders[rowIndex];
        curOrder.authStatus = authStatus;
        dispatch(setOrders([...curOrders, curOrder]));
        const newStatus:StatusUpdateInfo = {rowIndex,type:StatusUpdateTypes.AUTH,status:authStatus}
        dispatch(setStatusUpdate(newStatus))
    }

    const onScheduleChange = (rowIndex: number, schedulingStatus:ScheduleStatusType) => {
        const curOrder = curOrders[rowIndex];
        curOrder.scheduleStatus = schedulingStatus;
        dispatch(setOrders([...curOrders, curOrder]));
        const newStatus:StatusUpdateInfo = {rowIndex,type:StatusUpdateTypes.AUTH,status:schedulingStatus}
        dispatch(setStatusUpdate(newStatus))
    }

    const onAddNote = (rowIndex: number, actionNote:ActionNote) => {
        console.log('row index', rowIndex, 'note', actionNote);
        const noteInfo:CreateNoteInfo = {rowIndex,classIsOpen:true};
        dispatch(setCreateNoteOpen(noteInfo));
    }

    const onAddViewHistory = (rowIndex:number) => {
        const viewInfo:ViewNoteInfo = {rowIndex,classIsOpen:true};
        dispatch(setViewNotes(viewInfo)); 
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
        {headerName: 'Add Note',flex:0.6, 
            cellRenderer:AddNote,
            cellRendererParams:{onAddNote:onAddNote}
        },
        {headerName: 'History', flex:0.4, 
            cellRenderer:ViewHistory, 
            cellRendererParams:{onAddViewHistory:onAddViewHistory}
    },
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
            {noteInfo.classIsOpen && <CreateNote classIsOpen={noteInfo.classIsOpen} />}
            {viewInfo.classIsOpen && <ShowHistory classIsOpen={viewInfo.classIsOpen} />}
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