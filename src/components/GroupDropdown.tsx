import React, {useState} from 'react';
import { GROUPS } from '../Data/groupData';
import { setGroup } from '../store/AssignTasks/actions/AssignTasks.actions';
import { useDispatch} from 'react-redux';






const GroupDropdown: React.FC = () => {

    const [selectedGroup, setSelectedGroup] = useState('0');
    const dispatch = useDispatch();


    const onChange = (event:React.ChangeEvent<HTMLSelectElement> ) => {
        setSelectedGroup(event.target.value as string);
        const groupIndex = GROUPS.findIndex((group) => group.groupId.toString() === event.target.value);
        const curGroup = GROUPS[groupIndex];
        dispatch(setGroup(curGroup));

    }

    return(
        <div>
            <select value={selectedGroup} onChange={onChange}>
                {GROUPS.map((group) => {
                    return <option key={group.groupId} value={group.groupId}>{group.groupName}</option>
                })}
            </select>
        </div>
    )


}
export default GroupDropdown;