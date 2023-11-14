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
import ViewHistory from '../components/ViewHistory';
import PriorityCell from '../components/PriorityCell';
import UserDropDown from '../components/UserDropDown';
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
    const [notStarted, setNotStarted] = useState(0);
    const [pending, setPending] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [notScheduled, setNotScheduled] = useState(0);
    const [scheduled, setScheduled] = useState(0);





    useEffect(() => {
        if (statusUpdate.orderId !== -1){
            const now = new Date();
            const note = `Order ${statusUpdate.type} Status changed to ${statusUpdate.status}`;
            const newNote:ActionNote = {orderId: statusUpdate.orderId, userName:curUser.userName, data:note, timeStamp:now};
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

    useEffect(() => {
        const userFilter = curOrders.filter((order) => order.assignedUserId === curUser.userId)
        const notStarted = userFilter.filter((order)=> order.authStatus === AuthStatusType.NOT_STARTED);
        const pending = userFilter.filter((order)=> order.authStatus === AuthStatusType.PENDING ||
                                            order.authStatus === AuthStatusType.PENDING_P2P);
        const completed =  userFilter.filter((order)=> order.authStatus === AuthStatusType.OBTAINED ||
                                            order.authStatus === AuthStatusType.DENIED ||  order.authStatus === AuthStatusType.NO_AUTH_REQUIRED);
        const scheduled = userFilter.filter((order)=> order.scheduleStatus === ScheduleStatusType.OUTSIDE_FACILITY ||
                                            order.scheduleStatus === ScheduleStatusType.SCHEDULED);
        const notScheduled = userFilter.filter((order)=> order.scheduleStatus === ScheduleStatusType.NOT_SCHEDULED);
        setNotStarted(notStarted.length);
        setPending(pending.length);
        setCompleted(completed.length);
        setScheduled(scheduled.length);
        setNotScheduled(notScheduled.length);
    },[statusUpdate,curUser])



    useEffect(()=> {
        const userFilter = curOrders.filter((order) => order.assignedUserId === curUser.userId);
        const notStarted = userFilter.filter((order)=> order.authStatus === AuthStatusType.NOT_STARTED).sort((a,b)=> a.id - b.id);
        const pending = userFilter.filter((order)=> order.authStatus === AuthStatusType.PENDING ||
                                            order.authStatus === AuthStatusType.PENDING_P2P).sort((a,b)=> a.id - b.id);
        const completed =  userFilter.filter((order)=> order.authStatus === AuthStatusType.OBTAINED ||
                                            order.authStatus === AuthStatusType.DENIED ||  order.authStatus === AuthStatusType.NO_AUTH_REQUIRED).sort((a,b)=> a.id - b.id);
        const scheduled = userFilter.filter((order)=> order.scheduleStatus === ScheduleStatusType.OUTSIDE_FACILITY ||
                                            order.scheduleStatus === ScheduleStatusType.SCHEDULED).sort((a,b)=> a.id - b.id);
        const notScheduled = userFilter.filter((order)=> order.scheduleStatus === ScheduleStatusType.NOT_SCHEDULED).sort((a,b)=> a.id - b.id);

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


    },[selectedHeading, curOrders,curUser])
    
    const onAuthChange = (orderId: number, authStatus:AuthStatusType) => {
        const orderIndex = curOrders.findIndex((order) => order.id === orderId)
        if (orderIndex === -1) {
            return 
        }
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
        {headerName: '', field: 'priority', flex:0.3,
            cellRenderer:PriorityCell},
        {headerName: 'Name', field: 'orderName', flex:0.8},
        {headerName: 'Order Date', field: 'orderDate', flex:0.8},
        {headerName: 'Carrier', field: 'carrier', flex:0.5},
        {headerName: 'Patient', field: 'patientName', flex:0.7},
        {headerName: 'Auth Status', field: 'authStatus',flex:0.8,
            cellRenderer:AuthStatsDropdown,
            cellRendererParams:{onAuthChange: onAuthChange}},
        {headerName: 'Schedule Status', field: 'scheduleStatus',flex:0.8,
        cellRenderer:ScheduleStatsDropdown,
        cellRendererParams:{onScheduleChange: onScheduleChange}},
        {headerName: 'Last Updated', field: 'lastUpdated', flex:0.5},
        {headerName: 'Add Note',flex:0.5, 
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
          gridApi.sizeColumnsToFit();
        }
      }, [gridApi]);





    return (
        <div className='ag-theme-alpine' style={{height: '500px'}}>
            <div className='mytasks-header'>
                <div className='status-headings'>
                    <h4 className ={classnames("status-heading",{selected:(selectedHeading === SelectedHeadings.NOT_STARTED) ? 'selected' : ''})}
                        onClick={()=> setSelectedHeading(SelectedHeadings.NOT_STARTED)}>Not Started ({notStarted})</h4>
                    <h4 className ={classnames("status-heading",{selected:(selectedHeading === SelectedHeadings.PENDING) ? 'selected' : ''})}  
                        onClick={()=>setSelectedHeading(SelectedHeadings.PENDING)}>Pending ({pending})</h4>
                    <h4 className ={classnames("status-heading",{selected:(selectedHeading === SelectedHeadings.COMPLETED) ? 'selected' : ''})} 
                        onClick={()=> setSelectedHeading(SelectedHeadings.COMPLETED)}>Completed ({completed})</h4>
                    <h4 className ={classnames("status-heading",{selected:(selectedHeading === SelectedHeadings.NOT_SCHEDULED) ? 'selected' : ''})} 
                        onClick={()=> setSelectedHeading(SelectedHeadings.NOT_SCHEDULED)}>Not Scheduled ({notScheduled})</h4>
                    <h4 className ={classnames("status-heading",{selected:(selectedHeading === SelectedHeadings.SCHEDULED) ? 'selected' : ''})} 
                        onClick={()=> setSelectedHeading(SelectedHeadings.SCHEDULED)}>Scheduled ({scheduled})</h4>
                </div>
                <div className='status-user' >
                    <label className='status-user-label'>Current User:</label>
                    <UserDropDown />
                </div>
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