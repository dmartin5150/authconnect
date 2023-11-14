import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { selectUser } from '../store/OrderTasks/selectors/orderTasks.selector';
import { selectUsers } from '../store/Admin/selectors/admin.selectors';
import { setUser } from '../store/OrderTasks/actions/orderTasks.actions';








const UserDropDown = () => {

    const [selectedUser, setSelectedUser] = useState('0');
    const users = useSelector(selectUsers);
    const dispatch = useDispatch();


    const onChange = (event:React.ChangeEvent<HTMLSelectElement> ) => {
        setSelectedUser(event.target.value as string);
        const userIndex = users.findIndex((user) => user.userId.toString() === event.target.value);
        const curUser = users[userIndex];
        dispatch(setUser(curUser));
    }

    return(
        <div>
            <select value={selectedUser} onChange={onChange}>
                {users.map((user) => {
                    return <option key={user.userId} value={user.userId}>{user.userName}</option>
                })}
            </select>
        </div>
    )

}

export default UserDropDown;