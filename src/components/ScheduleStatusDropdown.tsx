import React, {useState, useEffect} from 'react';
import { ScheduleStatusType } from '../store/OrderTasks/orderTasks.types';
import { ICellRendererParams} from "ag-grid-community";

export interface ScheduleStatusDropdownProps {
    onScheduleChange: (orderId: number, authStatus:ScheduleStatusType) => void
}


const ScheduleStatsDropdown: React.FC<ScheduleStatusDropdownProps> = ({onScheduleChange, ...props}) =>  {
    const[scheduleStatus, setScheduleStatus] = useState<ScheduleStatusType>(ScheduleStatusType.NOT_SCHEDULED)


    useEffect (()=> {
        setScheduleStatus((props as ICellRendererParams).data.scheduleStatus);
    },[(props as ICellRendererParams).data.schedulingStatus])


    const onChange = (event:React.ChangeEvent<HTMLSelectElement> ) => {
        const orderId = (props as ICellRendererParams).data.id;
        setScheduleStatus(event.target.value as ScheduleStatusType);
        onScheduleChange(orderId, event.target.value as ScheduleStatusType);
    }
    return(
        <div>
            <select value={scheduleStatus} onChange={onChange}>
                <option value={ScheduleStatusType.NOT_SCHEDULED}>Not Scheduled</option>
                <option value={ScheduleStatusType.SCHEDULED}>Scheduled</option>
                <option value={ScheduleStatusType.OUTSIDE_FACILITY}>Outside Facility</option>
            </select>
        </div>
    )
}


export default ScheduleStatsDropdown;