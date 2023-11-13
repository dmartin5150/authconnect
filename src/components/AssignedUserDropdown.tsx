import React, {useState, useEffect} from 'react';
import { ICellRendererParams} from "ag-grid-community";
import { USERS } from '../Data/userData';
import { User } from '../store/OrderTasks/orderTasks.types';
import { selectGroup } from '../store/AssignTasks/selectors/AssignTasks.selectors';
import {useSelector, useDispatch} from 'react-redux';
import { UNASSIGNED_USER } from '../Data/userData';


export interface AssignUserDropdownProps {
    onAssignUserChange: (orderId: number, userId:number) => void
}


const AssignedUserDropdown: React.FC<AssignUserDropdownProps> = ({onAssignUserChange, ...props}) =>  {
    const[assignedUser, setAssignedUser] = useState('0')
    const [userList, setUserList] = useState<User[]>([])

    const curGroup = useSelector(selectGroup);
    const dispatch = useDispatch();

    useEffect(() => {
        let curUsers = USERS.map((user) => {
            if(user.groupIds.indexOf(curGroup.groupId) !== -1) {
                return user
            }
            return UNASSIGNED_USER;
        });
        curUsers = curUsers.filter((user) => user.userId !== 0);
        setUserList(curUsers);
    },[curGroup])

    useEffect (()=> {
        setAssignedUser((props as ICellRendererParams).data.assignedUserId);
    },[(props as ICellRendererParams).data.assignedUserId])


    const onChange = (event:React.ChangeEvent<HTMLSelectElement> ) => {
        const orderId = (props as ICellRendererParams).data.id;
        setAssignedUser(event.target.value);
        onAssignUserChange(orderId, +event.target.value);
    }
    return(
        <div>
            <select value={assignedUser} onChange={onChange}>
                {userList.map((user, idx) => {
                    return <option value={user?.userId} key={idx}>{user?.userName}</option>
                })}
            </select>
        </div>
    )
}


export default AssignedUserDropdown;