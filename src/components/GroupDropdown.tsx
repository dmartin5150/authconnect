import React, {useState, useEffect} from 'react';

import { setGroup } from '../store/AssignTasks/actions/AssignTasks.actions';
import { useDispatch, useSelector} from 'react-redux';
import { selectGroups } from '../store/Admin/selectors/admin.selectors';
import { selectGroup } from '../store/AssignTasks/selectors/AssignTasks.selectors';
import { Group } from '../store/OrderTasks/orderTasks.types';
import { getActiveElement } from '@testing-library/user-event/dist/utils';
import { selectunAssignedGroup } from '../store/AssignTasks/selectors/AssignTasks.selectors';


interface GroupDropDownProps {
    groups: Group[];
    includeUnassigned: boolean;
}



const GroupDropdown: React.FC<GroupDropDownProps> = ({groups, includeUnassigned=true, ...props}) => {

    const [selectedGroup, setSelectedGroup] = useState('0');
    const dispatch = useDispatch();

    const activeGroup = useSelector(selectGroup);
    const unassignedGroup = useSelector(selectunAssignedGroup);


    useEffect(() => {
        if (activeGroup.groupId === 0 && !includeUnassigned) {
            const firstId = groups[0].groupId;
            console.log('here, group 1 is', firstId)
            setSelectedGroup(firstId.toString());
            dispatch(setGroup(groups[0]))
        } else {
            setSelectedGroup(activeGroup.groupId.toString())
        }

    },[activeGroup]);

    useEffect(()=> {
        setSelectedGroup(activeGroup.groupId.toString());
    },[groups])


    const onChange = (event:React.ChangeEvent<HTMLSelectElement> ) => {
        setSelectedGroup(event.target.value as string);
        if (event.target.value === '0') {
            dispatch(setGroup(unassignedGroup));
        } else {
            const groupIndex = groups.findIndex((group) => group.groupId.toString() === event.target.value);
            const curGroup = groups[groupIndex];
            dispatch(setGroup(curGroup));
        }
    }


    return(
        <div>
            <select value={selectedGroup} onChange={onChange}>
                {includeUnassigned &&<option key={0} value={0}>{'Unassigned'}</option>}
                {groups.map((group) => {
                    return <option key={group.groupId} value={group.groupId}>{group.groupName}</option>
                })}
            </select>
        </div>
    )


}
export default GroupDropdown;