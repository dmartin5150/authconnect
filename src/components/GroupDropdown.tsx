import React, {useState} from 'react';

import { setGroup } from '../store/AssignTasks/actions/AssignTasks.actions';
import { useDispatch, useSelector} from 'react-redux';
import { selectGroups } from '../store/Admin/selectors/admin.selectors';






const GroupDropdown: React.FC = () => {

    const [selectedGroup, setSelectedGroup] = useState('0');
    const dispatch = useDispatch();
    const groups = useSelector(selectGroups)


    const onChange = (event:React.ChangeEvent<HTMLSelectElement> ) => {
        setSelectedGroup(event.target.value as string);
        const groupIndex = groups.findIndex((group) => group.groupId.toString() === event.target.value);
        const curGroup = groups[groupIndex];
        dispatch(setGroup(curGroup));

    }

    return(
        <div>
            <select value={selectedGroup} onChange={onChange}>
                {groups.map((group) => {
                    return <option key={group.groupId} value={group.groupId}>{group.groupName}</option>
                })}
            </select>
        </div>
    )


}
export default GroupDropdown;