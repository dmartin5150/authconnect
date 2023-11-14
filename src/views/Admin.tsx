import React, { useState } from 'react';
import DualListBox from 'react-dual-listbox';
import GroupDropdown from '../components/GroupDropdown';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import './Admin.css'

import GroupList from '../components/GroupList';

const options = [
    { value: 'one', label: 'Option One' },
    { value: 'two', label: 'Option Two' },
];

function Admin() {
    const [selected, setSelected] = useState<string[]>([]);

    return (
        <div className='admin'>
            <div className='admin-controls'>
                <div className='admin-controls-groups'>
                    <div className='admin-controls-groupdropdown'>
                        <label>Select Group</label>
                        <GroupDropdown />
                    </div>
                    <div className='admin-controls-buttons'>
                        <div className='admin-controls-buttons-section'>
                            <button className='admin-controls-buttons right'>Select Department</button>
                            <button className='admin-controls-buttons'>Select Users</button>
                        </div>
                        <div className='admin-controls-buttons-section'>
                            <button className='admin-controls-buttons right'>Add New Group</button>
                            <button className='admin-controls-buttons'>Select Providers</button>
                        </div>
                    </div>
                </div>
                <div className='admin-dualbox'>
                    <DualListBox
                        // canFilter
                        lang={{availableHeader: 'Available Department', selectedHeader:'Selected Departments'}}
                        options={options}
                        selected={selected}
                        onChange={(value:string[]) => setSelected(value)}
                        showHeaderLabels={true}
                    />
                </div>
            </div>
            <div className='admin-grouplist'>
                <GroupList />
                <GroupList />
                <GroupList />
            </div>
        </div>

    );
}

export default Admin