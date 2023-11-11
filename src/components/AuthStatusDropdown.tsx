import React, {useState} from 'react';
import { AuthStatusType } from '../store/OrderTasks/orderTasks.types';


export interface AuthStatusDropdownProps {
    onAuthChange: (authStatus:AuthStatusType) => void
}


const AuthStatsDropdown: React.FC<AuthStatusDropdownProps> = ({onAuthChange}) =>  {
    const[authStatus, setAuthStatus] = useState<AuthStatusType>(AuthStatusType.NOT_STARTED)

    const onChange = (event:React.ChangeEvent<HTMLSelectElement> ) => {
        onAuthChange(event.target.value as AuthStatusType);
        setAuthStatus(event.target.value as AuthStatusType);
    }
    return(
        <div>
            <select value={authStatus} onChange={onChange}>
                <option value={AuthStatusType.NOT_STARTED}>Not Started</option>
                <option value={AuthStatusType.PENDING}>Pending</option>
                <option value={AuthStatusType.OBTAINED}>Obtained</option>
                <option value={AuthStatusType.DENIED}>Denied </option>
                <option value={AuthStatusType.PENDING_P2P}>Pending P2P</option>
            </select>
        </div>
    )
}


export default AuthStatsDropdown;