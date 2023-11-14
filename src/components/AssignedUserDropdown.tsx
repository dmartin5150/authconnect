import React, {useState, useEffect} from 'react';
import { ICellRendererParams} from "ag-grid-community";
import { User } from '../store/OrderTasks/orderTasks.types';
import { selectGroup } from '../store/AssignTasks/selectors/AssignTasks.selectors';
import { selectUsers } from '../store/Admin/selectors/admin.selectors';

import {useSelector, useDispatch} from 'react-redux';
import { UNASSIGNED_USER } from '../Data/userData';
import classnames from "classnames";


export interface AssignUserDropdownProps {
    onAssignUserChange: (orderId: number, userId:number) => void
}


const AssignedUserDropdown: React.FC<AssignUserDropdownProps> = ({onAssignUserChange, ...props}) =>  {
    const[assignedUser, setAssignedUser] = useState('0')
    const [userList, setUserList] = useState<User[]>([])

    const curGroup = useSelector(selectGroup);
    const users = useSelector(selectUsers)
    const dispatch = useDispatch();

    useEffect(() => {
        let curUsers = [];
        curUsers = users.map((user) => {
            console.log('cur group users', curGroup.userIds)
            console.log('user', user)
            if(curGroup.userIds.indexOf(user.userId) !== -1) {
                return user
            }
            return UNASSIGNED_USER;
        });
        console.log('curUsers', curUsers)
        curUsers = curUsers.filter((user) => user.userId !== 0);
        curUsers.push(UNASSIGNED_USER);
        setUserList(curUsers);
    },[curGroup, users])



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
                    return <option
                    className ={classnames({selected:((props as ICellRendererParams).data.assignedUserId === user.userId) ? 'selected' : ''})}
                    value={user?.userId} key={idx}>{user?.userName}</option>
                })}
            </select>
        </div>
    )
}


export default AssignedUserDropdown;