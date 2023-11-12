import React, {useState, useEffect} from 'react';
import { AuthStatusType } from '../store/OrderTasks/orderTasks.types';
import { ICellRendererParams} from "ag-grid-community";

export interface AuthStatusDropdownProps {
    onAuthChange: (orderId: number, authStatus:AuthStatusType) => void,
}

const AuthStatsDropdown: React.FC<AuthStatusDropdownProps> = ({onAuthChange, ...props}) =>
  {
    const[authStatus, setAuthStatus] = useState<AuthStatusType>(AuthStatusType.NOT_STARTED)


    useEffect (()=> {
        setAuthStatus((props as ICellRendererParams).data.authStatus);
    },[(props as ICellRendererParams).data.authStatus])


    const onChange = (event:React.ChangeEvent<HTMLSelectElement> ) => {
        const orderId = (props as ICellRendererParams).data.id;
        onAuthChange(orderId, event.target.value as AuthStatusType);
        setAuthStatus(event.target.value as AuthStatusType);
    }
    return(
        <div>
            <select value={authStatus} onChange={onChange}>
                <option value={AuthStatusType.NOT_STARTED}>Not Started</option>
                <option value={AuthStatusType.PENDING}>Pending</option>
                <option value={AuthStatusType.OBTAINED}>Obtained</option>
                <option value={AuthStatusType.DENIED}>Denied </option>
                <option value={AuthStatusType.NO_AUTH_REQUIRED}>Not Required</option>
                <option value={AuthStatusType.PENDING_P2P}>Pending P2P</option>
            </select>
        </div>
    )
}


export default AuthStatsDropdown;