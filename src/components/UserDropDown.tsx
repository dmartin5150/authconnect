import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { selectUser } from '../store/OrderTasks/selectors/orderTasks.selector';
import { setUser } from '../store/OrderTasks/actions/orderTasks.actions';
import { USERS } from '../Data/userData';







const UserDropDown = () => {

    const [selectedUser, setSelectedUser] = useState('0');
    const dispatch = useDispatch();


    const onChange = (event:React.ChangeEvent<HTMLSelectElement> ) => {
        setSelectedUser(event.target.value as string);
        const userIndex = USERS.findIndex((user) => user.userId.toString() === event.target.value);
        const curUser = USERS[userIndex];
        dispatch(setUser(curUser));
    }

    return(
        <div>
            <select value={selectedUser} onChange={onChange}>
                {USERS.map((user) => {
                    return <option key={user.userId} value={user.userId}>{user.userName}</option>
                })}
            </select>
        </div>
    )

}

export default UserDropDown;