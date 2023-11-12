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
import classnames from "classnames";


const MyTasks = () => {

    const curOrders = useSelector(selectOrders);
    const noteInfo = useSelector(selectCreateNoteOpen);
    const viewInfo = useSelector(selectViewNotes);
    const curUser = useSelector(selectUser);
    const actionNotes = useSelector(selectActionNotes);
    const statusUpdate = useSelector(selectStatusUpdate);
    const dispatch = useDispatch();


    const enum SelectedHeadings {
        NOT_STARTED ='Not Started',
        PENDING = 'Pending',
        COMPLETED = 'Completed',
        NOT_SCHEDULED = 'Not Scheduled',
        SCHEDULED = 'Scheduled'

    }

    const [selectedHeading, setSelectedHeading] = useState<SelectedHeadings>(SelectedHeadings.NOT_STARTED);





    useEffect(() => {
        if (statusUpdate.orderId !== -1){
            const now = new Date();
            const note = `Order ${statusUpdate.type} Status changed to ${statusUpdate.status}`;
            const newNote:ActionNote = {orderId: statusUpdate.orderId, userName:curUser.userName, data:note, timeStamp:now};
            // console.log('action notes', actionNotes);
            dispatch(setActionNotes([...actionNotes, newNote]))
            const orderIndex = curOrders.findIndex((order) => order.id === statusUpdate.orderId)
            if (orderIndex === -1) {
                return;
            }
            const newOrders = [...curOrders];
            const filteredOrders = newOrders.filter((order) => order.id !== statusUpdate.orderId);
            const newOrder = curOrders[orderIndex]
            newOrder.lastUpdated = now;
            dispatch(setOrders([...filteredOrders, newOrder]));
        }
    },[statusUpdate])


    useEffect(()=> {
        const notStarted = curOrders.filter((order)=> order.authStatus === AuthStatusType.NOT_STARTED);
        const pending = curOrders.filter((order)=> order.authStatus === AuthStatusType.PENDING ||
                                            order.authStatus === AuthStatusType.PENDING_P2P);
        const completed =  curOrders.filter((order)=> order.authStatus === AuthStatusType.OBTAINED ||
                                            order.authStatus === AuthStatusType.DENIED ||  order.authStatus === AuthStatusType.NO_AUTH_REQUIRED);
        const scheduled = curOrders.filter((order)=> order.scheduleStatus === ScheduleStatusType.OUTSIDE_FACILITY ||
                                            order.scheduleStatus === ScheduleStatusType.SCHEDULED);
        const notScheduled = curOrders.filter((order)=> order.scheduleStatus === ScheduleStatusType.NOT_SCHEDULED);

        if (selectedHeading === SelectedHeadings.NOT_STARTED) {
            setRowData(notStarted);
        } else if (selectedHeading === SelectedHeadings.PENDING) {
            setRowData(pending);
        } else if (selectedHeading === SelectedHeadings.COMPLETED) {
            setRowData(completed);
        }else if (selectedHeading === SelectedHeadings.SCHEDULED) {
            setRowData(scheduled);
        } else {
            setRowData(notScheduled);
        }


    },[selectedHeading, curOrders])
    
    const onAuthChange = (orderId: number, authStatus:AuthStatusType) => {
        const orderIndex = curOrders.findIndex((order) => order.id === orderId)
        if (orderIndex === -1) {
            return 
        }
        console.log('orderIndex', orderIndex)
        const newOrder = curOrders[orderIndex]
        const newOrders = [...curOrders];
        const filteredOrders = newOrders.filter((order) => order.id !== orderId);
        newOrder.authStatus = authStatus;
        dispatch(setOrders([...filteredOrders, newOrder]));
        const newStatus:StatusUpdateInfo = {orderId,type:StatusUpdateTypes.AUTH,status:authStatus}
        dispatch(setStatusUpdate(newStatus))
    }

    const onScheduleChange = (orderId: number, schedulingStatus:ScheduleStatusType) => {
        const orderIndex = curOrders.findIndex((order) => order.id === orderId)
        if (orderIndex === -1) {
            return 
        }
        const newOrder = curOrders[orderIndex]
        const newOrders = [...curOrders];
        const filteredOrders = newOrders.filter((order) => order.id !== orderId);
        newOrder.scheduleStatus = schedulingStatus;
        dispatch(setOrders([...filteredOrders, newOrder]));
        const newStatus:StatusUpdateInfo = {orderId,type:StatusUpdateTypes.AUTH,status:schedulingStatus}
        dispatch(setStatusUpdate(newStatus))
    }

    const onAddNote = (orderId: number, actionNote:ActionNote) => {
        const noteInfo:CreateNoteInfo = {orderId,classIsOpen:true};
        dispatch(setCreateNoteOpen(noteInfo));
    }

    const onAddViewHistory = (orderId:number) => {
        const viewInfo:ViewNoteInfo = {orderId,classIsOpen:true};
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
            // console.log('resizing columns')
          gridApi.sizeColumnsToFit();
        }
      }, [gridApi]);




    return (
        <div className='ag-theme-alpine' style={{height: '500px'}}>
            <div className='status-headings'>
                <h4 className ={classnames("status-heading",{selected:(selectedHeading === SelectedHeadings.NOT_STARTED) ? 'selected' : ''})}
                    onClick={()=> setSelectedHeading(SelectedHeadings.NOT_STARTED)}>Not Started (0)</h4>
                <h4 className ={classnames("status-heading",{selected:(selectedHeading === SelectedHeadings.PENDING) ? 'selected' : ''})}  
                    onClick={()=>setSelectedHeading(SelectedHeadings.PENDING)}>Pending (0)</h4>
                <h4 className ={classnames("status-heading",{selected:(selectedHeading === SelectedHeadings.COMPLETED) ? 'selected' : ''})} 
                    onClick={()=> setSelectedHeading(SelectedHeadings.COMPLETED)}>Completed (0)</h4>
                <h4 className ={classnames("status-heading",{selected:(selectedHeading === SelectedHeadings.NOT_SCHEDULED) ? 'selected' : ''})} 
                    onClick={()=> setSelectedHeading(SelectedHeadings.NOT_SCHEDULED)}>Not Scheduled (0)</h4>
                <h4 className ={classnames("status-heading",{selected:(selectedHeading === SelectedHeadings.SCHEDULED) ? 'selected' : ''})} 
                    onClick={()=> setSelectedHeading(SelectedHeadings.SCHEDULED)}>Scheduled (0)</h4>
            </div>
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