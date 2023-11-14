import React, {useState, useEffect} from 'react';

import { setGroup } from '../store/AssignTasks/actions/AssignTasks.actions';
import { useDispatch, useSelector} from 'react-redux';
import { selectGroups, selectGroupswithoutUnassigned } from '../store/Admin/selectors/admin.selectors';
import { Group } from '../store/OrderTasks/orderTasks.types';


interface GroupDropDownProps {
    groups: Group[];
    includeUnassigned: boolean;
}



const GroupDropdown: React.FC<GroupDropDownProps> = ({groups, includeUnassigned=true}) => {

    const [selectedGroup, setSelectedGroup] = useState('0');
    const dispatch = useDispatch();

    const groupswithoutUnassigned = useSelector(selectGroupswithoutUnassigned)
    

    useEffect(() => {
        setSelectedGroup('1');
    },[]);


    const onChange = (event:React.ChangeEvent<HTMLSelectElement> ) => {
        setSelectedGroup(event.target.value as string);
        const groupIndex = groups.findIndex((group) => group.groupId.toString() === event.target.value);
        const curGroup = groups[groupIndex];
        dispatch(setGroup(curGroup));

    }

    return(
        <div>
            <select value={selectedGroup} onChange={onChange}>
                {includeUnassigned && groups.map((group) => {
                    return <option key={group.groupId} value={group.groupId}>{group.groupName}</option>
                })}
                {!includeUnassigned && groupswithoutUnassigned.map((group) => {
                    return <option key={group.groupId} value={group.groupId}>{group.groupName}</option>
                })}
            </select>
        </div>
    )


}
export default GroupDropdown;