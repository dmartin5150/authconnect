import React, {useState} from 'react';
import { ScheduleStatusType } from '../store/OrderTasks/orderTasks.types';


export interface AuthStatusDropdownProps {
    onScheduleChange?: (authStatus:ScheduleStatusType) => void
}


const ScheduleStatsDropdown: React.FC<AuthStatusDropdownProps> = ({onScheduleChange}) =>  {
    const[scheduleStatus, setScheduleStatus] = useState<ScheduleStatusType>(ScheduleStatusType.NOT_SCHEDULED)

    const onChange = (event:React.ChangeEvent<HTMLSelectElement> ) => {
        setScheduleStatus(event.target.value as ScheduleStatusType);
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