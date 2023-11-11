import React, {useState} from 'react';


export interface AuthStatusDropdownProps {
    onAuthChange: (authStatus:string) => void
}


const AuthStatsDropdown: React.FC<AuthStatusDropdownProps> = ({onAuthChange}) =>  {
    const[authStatus, setAuthStatus] = useState('Not Started');

    const onChange = (event:React.ChangeEvent<HTMLSelectElement> ) => {
        onAuthChange(event.target.value);
        setAuthStatus(event.target.value);
    }
    return(
        <div>
            <select value={authStatus} onChange={onChange}>
                <option value="Not Started">Not Started </option>
                <option value="Pending">Pending</option>
                <option value="Auth Obtained">Obtained</option>
                <option value="Auth Denied">Denied </option>
                <option value="Pending P2P">Pending P2P</option>
            </select>
        </div>
    )
}


export default AuthStatsDropdown;