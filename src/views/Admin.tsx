import React, { useState } from 'react';
import DualListBox from 'react-dual-listbox';
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
            <div className='admin-dualbox'>
                <DualListBox
                    canFilter
                    lang={{availableHeader: 'Available Department', selectedHeader:'Selected Departments'}}
                    options={options}
                    selected={selected}
                    onChange={(value:string[]) => setSelected(value)}
                    showHeaderLabels={true}
                />
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