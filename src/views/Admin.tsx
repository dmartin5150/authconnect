import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGroups } from '../store/Admin/selectors/admin.selectors';
import { setGroup } from '../store/AssignTasks/actions/AssignTasks.actions';
import { setGroups } from '../store/Admin/actions/admin.actions';
import { setUnassigned } from '../store/AssignTasks/actions/AssignTasks.actions';
import { selectGroup } from '../store/AssignTasks/selectors/AssignTasks.selectors';
import { selectProviders,selectDepartments,selectUsers, selectEditMode} from '../store/Admin/selectors/admin.selectors';
import { EDIT_MODES } from '../store/Admin/admin.types';
import { setEditMode } from '../store/Admin/actions/admin.actions';
import { Group } from '../store/OrderTasks/orderTasks.types';
import { EMPTY_GROUP } from '../Data/groupData';
import { selectunAssignedGroup } from '../store/AssignTasks/selectors/AssignTasks.selectors';
import DualListBox from 'react-dual-listbox';
import { GroupItem } from '../components/GroupList';
import GroupDropdown from '../components/GroupDropdown';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import './Admin.css'
import MessageModal from '../components/MessageModal';
import { IDObject } from '../store/OrderTasks/orderTasks.types';
import GroupList from '../components/GroupList';


type Option = {
    value: string;
    label: string;
}



function Admin() {



    const [options, setOptions] = useState<Option[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [providerItems, setProviderItems] = useState<GroupItem[]>([])
    const [userItems, setUserItems] = useState<GroupItem[]>([])
    const [departmentItems, setDepartmentItems] = useState<GroupItem[]>([])
    const [itemsUpdated, setItemsUpdated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [messageHead, setMessageHead] = useState('');
    const [messageText, setMessageText] = useState('');
    const [messageSubmitFxn, setMessageSubmitFxn] = useState<()=> (input:string)=>void>(()=>()=>{})
    const [allProviderIds, setAllProviderIds] = useState<number[]>([]);
    const [allDepartmentIds, setAllDepartmentIds] = useState<number[]>([]);
    const [allUserIds, setAllUserIds] = useState<number[]>([]);


    const curGroup = useSelector(selectGroup);
    const providers = useSelector(selectProviders);
    const departments = useSelector(selectDepartments);
    const users = useSelector(selectUsers);
    const editMode = useSelector(selectEditMode);
    const groups = useSelector(selectGroups);
    const unassignedGroup = useSelector(selectunAssignedGroup)
    const dispatch = useDispatch();

    console.log(groups)

    useEffect(()=> {
        console.log('groups changed')
    },[groups])


    useEffect(()=> {
        setAllProviderIds(providers.map((provider) => provider.id));
        setAllDepartmentIds(departments.map((department) => department.departmentId))
        setAllUserIds(users.map((user) => user.userId))
    }, [users, providers, departments])

    useEffect(()=> {
        const assignedIds = getAssignedIds();
        const unassigned = getUpdatedUnassignedGroup(assignedIds);
        console.log('log', unassigned)
        dispatch(setUnassigned(unassigned))
    },[groups])

    useEffect(()=> {
        if(editMode) {
            if (editMode == EDIT_MODES.EDIT_DEPT) {
                const deptOptions:Option[] = departments.map((dept) => {
                    return {value:dept.departmentId.toString(), label: dept.departmentName}
                })
                setOptions(deptOptions)
            }
            if (editMode == EDIT_MODES.EDIT_PROVIDERS) {
                const providerOptions:Option[] = providers.map((provider) => {
                    return {value:provider.id.toString(), label: provider.firstName + ' ' + provider.lastName}
                })
                setOptions(providerOptions)
            }
            if (editMode === EDIT_MODES.EDIT_USERS) {
                let userOptions = users.map((user) => {
                    return {value: user.userId.toString(), label:user.userName}
                })
               
                userOptions = userOptions.filter((user) => user.value !== '0')
                setOptions(userOptions)
            }
            if (editMode == EDIT_MODES.NEW_GROUP || editMode == EDIT_MODES.EDIT_NEW_GROUP) {
                setOptions([])
            }
        }
    },[editMode])




    useEffect(() => {
        if(curGroup) {
            let pItems:GroupItem[];
            if (curGroup.providerIds.length !== 0) {
                pItems = curGroup.providerIds.map((itemId) => {
                    const provider = providers.filter((provider)=> provider.id === itemId)[0];
                    if (provider) {
                        const providerName = provider.firstName + ' ' + provider.lastName
                        return {itemId: provider.id.toString(), description: providerName }
                    } else {
                        return {itemId: '0', description: 'No Providers Selected'}
                    }
                })
            } else {
                pItems = [{itemId: '0', description: 'No Providers Selected'}]
            }
            setProviderItems(pItems);
            let dItems:GroupItem[];
            if (curGroup.departmentIds.length !== 0) {
                dItems = curGroup.departmentIds.map((itemId) => {
                    const department = departments.filter((department) => department.departmentId === itemId)[0]
                    if (department) {
                        const deptDescription = department.departmentName + ': ' + department.departmentId;
                        return {itemId:department.departmentId.toString(), description:deptDescription}
                    } else {
                        return {itemId: '0', description: 'No Departments Selected'}
                    }
                })
            } else {
                dItems = [{itemId: '0', description:'No Departments Selected'}]
            }
            setDepartmentItems(dItems);
            let uItems:GroupItem[];
            if (curGroup.userIds.length !== 0) {
                uItems = curGroup.userIds.map((itemId) => {
                    const user = users.filter((user) => user.userId === itemId)[0];
                    if (user) {
                        const userDescription = user.userName;
                        return {itemId: user.userId.toString(), description:userDescription}
                    } else {
                        return {itemId: '0', description: 'No Users Selected'}
                    }
                });
            } else {
               uItems = [{itemId: '0', description: 'No Users Selected'}] 
            }
            setUserItems(uItems);
            setItemsUpdated(!itemsUpdated);
        }
    }, [curGroup,groups ])

    useEffect(() => {
        if (!typeof(editMode) !== undefined ) {
            if (editMode === EDIT_MODES.EDIT_DEPT) {
                const select = departmentItems.map((item) => item.itemId.toString());
                setSelected(select)
            }
            if (editMode === EDIT_MODES.EDIT_PROVIDERS) {
                const selectedProviders = providerItems.map((item) => item.itemId.toString());
                setSelected(selectedProviders);
            }
            if (editMode === EDIT_MODES.EDIT_USERS) {
                const selectedUsers = userItems.map((item) => item.itemId.toString());
                setSelected(selectedUsers)
            }
        }
    },[editMode, curGroup, groups, itemsUpdated])


    const handleEditDept = (event:React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setEditMode(EDIT_MODES.EDIT_DEPT))

    }

    const handleEditUsers = (event:React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setEditMode(EDIT_MODES.EDIT_USERS))
    }

    const handleCreateGroup = () => (groupName:string) => {
        if (groupName?.trim().length !== 0) {
            const editedGroup = EMPTY_GROUP
            editedGroup.groupId = groups.length;
            editedGroup.groupName = groupName;
            dispatch(setGroup(editedGroup));
            dispatch(setGroups([...groups, editedGroup].sort((a,b)=> a.groupId - b.groupId)))
        }
        setShowModal(false)
    }
    
    const handleAddGroup = (event:React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setEditMode(EDIT_MODES.NEW_GROUP));
        setMessageText('');
        setMessageHead('Select Group Name:');
        setMessageSubmitFxn(handleCreateGroup);
        setShowModal(true);
    }

    const handleEditProviders = (event:React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setEditMode(EDIT_MODES.EDIT_PROVIDERS))
    }


    const handleModalNameChange = () => (groupName:string) => {
        if (groupName.trim().length !== 0) {
            const editedGroup = Object.assign({},curGroup);
            editedGroup.groupName = groupName;
            dispatch(setGroup(editedGroup));
            let editedGroups = [...groups];
            editedGroups = editedGroups.filter((group) => group.groupId !== editedGroup.groupId)
            dispatch(setGroups([...editedGroups, editedGroup].sort((a,b)=> a.groupId - b.groupId)))
        }
        setShowModal(false)
    }

    const handleEditGroupName = (event:React.MouseEvent<HTMLButtonElement>) => {
        setMessageText(curGroup.groupName);
        setMessageHead('Group Name:');
        setMessageSubmitFxn(handleModalNameChange);
        setShowModal(true);
    }

    const handleModalCancel = () => {
        setShowModal(false);
    }


    const getAssignedIds = ():IDObject => {
        const activeGroups = groups.filter((group) => group.groupId !== 0);
        let providerIds:number[] =[];
        let userIds:number[] = [];
        let departmentIds:number[] = [];

        const groupProviderIds = activeGroups.map((group) => {
            providerIds = [...providerIds, ...group.providerIds];
            userIds = [...userIds, ...group.userIds];
            departmentIds = [...departmentIds, ...group.departmentIds]
            return [...providerIds]
        })
        return {'providerId': Array.from(new Set([...providerIds])),
                'departmentId':Array.from(new Set([...departmentIds])),
                'userId': Array.from(new Set([...userIds]))
        };
    }

    const getUpdatedUnassignedGroup = (assignedIds:IDObject):Group => {
        const unAssignedProviderIds = allProviderIds.filter((id) => !assignedIds.providerId.includes(id));
        const unAssignedDepartmentIds = allDepartmentIds.filter((id) => !assignedIds.departmentId.includes(id));
        const unAssignedUserIds = allUserIds.filter((id) => !assignedIds.userId.includes(id));
        const unAssignedGroup:Group = Object.assign({}, unassignedGroup);
        // console.log('unassigned Group', unAssignedGroup)
        unAssignedGroup.providerIds = unAssignedProviderIds;
        unAssignedGroup.departmentIds = unAssignedDepartmentIds;
        unAssignedGroup.userIds = unAssignedUserIds;
        return unAssignedGroup
        
    }








    const handleRemoveGroup = () => {
        const editedGroup = {...curGroup};
        editedGroup.isActive = false;
        dispatch(setGroup(editedGroup));
        let editedGroups = [...groups];
        editedGroups = editedGroups.filter((group) => group.groupId !== editedGroup.groupId);
        dispatch(setGroups([...editedGroups, editedGroup].sort((a,b)=> a.groupId - b.groupId)));
        
    }


    const handleGroupChange = (value:string[]) => {
        const updatedNumber = value.map((value)=> +value).filter((value) => value != 0);
        console.log('updated numbers', updatedNumber)
        let updatedGroup:Group;
        if (editMode === EDIT_MODES.EDIT_DEPT) {
            const updatedGroup = Object.assign({}, curGroup)
            updatedGroup.departmentIds = updatedNumber;
            let updatedGroups = groups.filter((group) => group.groupId !== curGroup.groupId);
            updatedGroups = [...updatedGroups, updatedGroup]
            dispatch(setGroups(updatedGroups));
            dispatch(setGroup(updatedGroup))
        }
        if (editMode === EDIT_MODES.EDIT_PROVIDERS) {
            const updatedGroup = Object.assign({},curGroup)
            updatedGroup.providerIds = updatedNumber;
            let updatedGroups = groups.filter((group) => group.groupId !== curGroup.groupId);
            updatedGroups = [...updatedGroups, updatedGroup].sort((a,b) => a.groupId - b.groupId)
            dispatch(setGroups(updatedGroups));
            dispatch(setGroup(updatedGroup))
        }
        if (editMode === EDIT_MODES.EDIT_USERS) {
            const updatedGroup = Object.assign({},curGroup);
            updatedGroup.userIds = updatedNumber;
            let updatedGroups = groups.filter((group) => group.groupId !== curGroup.groupId);
            updatedGroups = [...updatedGroups, updatedGroup].sort((a,b) => a.groupId - b.groupId)
            dispatch(setGroups(updatedGroups));
            dispatch(setGroup(updatedGroup))
        }
    }

    return (
        <div className='admin'>
            {showModal && <MessageModal heading={messageHead} messageText={messageText} onModalSubmit={messageSubmitFxn} onModalCancel={handleModalCancel} classIsOpen={showModal} />}
            <div className='admin-controls'>
                <div className='admin-controls-groups'>
                    <div className='admin-controls-groupdropdown'>
                        <label>Select Group</label>
                        <GroupDropdown groups={groups.sort((a,b)=> a.groupId - b.groupId)} includeUnassigned={false} />
                    </div>
                    <div className='admin-controls-buttons'>
                        <div className='admin-controls-buttons-section'>
                            <button className='admin-controls-buttons right' onClick={handleEditDept}>Edit Department</button>
                            <button className='admin-controls-buttons' onClick={handleEditUsers}>Edit Users</button>
                        </div>
                        <div className='admin-controls-buttons-section'>
                            <button className='admin-controls-buttons right' onClick={handleEditGroupName}>Edit Group Name</button>
                            <button className='admin-controls-buttons' onClick={handleEditProviders}>Edit Providers</button>
                        </div>
                        <div className='admin-controls-buttons-section'>
                            <button className='admin-controls-buttons right' onClick={handleAddGroup}>Add New Group</button>
                            <button className='admin-controls-buttons' onClick={handleRemoveGroup}>Remove Group</button>
                        </div>
                    </div>
                </div>
                <div className='admin-dualbox'>
                    <label className='admin-dualbox-label'>{editMode}</label>
                    <DualListBox
                        lang={{
                            availableFilterHeader: 'Filter available',
                            availableHeader: 'Available',
                            moveAllLeft: 'Move all to available',
                            moveAllRight: 'Move all to selected',
                            moveLeft: 'Move to available',
                            moveRight: 'Move to selected',
                            moveBottom: 'Rearrange to bottom',
                            moveDown: 'Rearrange down',
                            moveUp: 'Rearrange up',
                            moveTop: 'Rearrange to top',
                            noAvailableOptions: 'No available options',
                            noSelectedOptions: 'No selected options',
                            selectedFilterHeader: 'Filter selected',
                            selectedHeader: 'Selected',
                        }}
                        options={options}
                        selected={selected}
                        onChange={handleGroupChange}
                        showHeaderLabels={true}
                    />
                </div>
            </div>
            <div className='admin-grouplist'>
                <GroupList title='Department' groupItems={departmentItems} />
                <GroupList title='Providers' groupItems={providerItems}/>
                <GroupList title= 'Users'  groupItems={userItems}/>
            </div>
        </div>

    );
}

export default Admin

