import React, {useState} from 'react';
import { ScheduleStatusType } from '../store/OrderTasks/orderTasks.types';
import { ICellRendererParams} from "ag-grid-community";

export interface ScheduleStatusDropdownProps {
    onScheduleChange: (rowIndex: number, authStatus:ScheduleStatusType) => void
}


const ScheduleStatsDropdown: React.FC<ScheduleStatusDropdownProps> = ({onScheduleChange, ...props}) =>  {
    const[scheduleStatus, setScheduleStatus] = useState<ScheduleStatusType>(ScheduleStatusType.NOT_SCHEDULED)

    const onChange = (event:React.ChangeEvent<HTMLSelectElement> ) => {
        const rowIndex = (props as ICellRendererParams).node.rowIndex;
        if (!rowIndex) {
            if (rowIndex === 0) {
                setScheduleStatus(event.target.value as ScheduleStatusType);
                onScheduleChange(rowIndex, event.target.value as ScheduleStatusType)
            }
        } else {
            setScheduleStatus(event.target.value as ScheduleStatusType);
            onScheduleChange(rowIndex, event.target.value as ScheduleStatusType)
        }
       
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