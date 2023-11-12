import React, {useState} from 'react';
import { AuthStatusType } from '../store/OrderTasks/orderTasks.types';
import { ICellRendererParams} from "ag-grid-community";

export interface AuthStatusDropdownProps {
    onAuthChange: (rowIndex: number, authStatus:AuthStatusType) => void,
}

const AuthStatsDropdown: React.FC<AuthStatusDropdownProps> = ({onAuthChange, ...props}) =>
  {
    const[authStatus, setAuthStatus] = useState<AuthStatusType>(AuthStatusType.NOT_STARTED)

    const onChange = (event:React.ChangeEvent<HTMLSelectElement> ) => {
        const rowIndex = (props as ICellRendererParams).node.rowIndex;
        if (!rowIndex) {
            if (rowIndex === 0) {
                onAuthChange(rowIndex, event.target.value as AuthStatusType);
                setAuthStatus(event.target.value as AuthStatusType);
            }
        } else {
            onAuthChange(rowIndex, event.target.value as AuthStatusType);
            setAuthStatus(event.target.value as AuthStatusType);
        }

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