import React from 'react';
import './GroupList.css'
const GroupList = () => {
    return(
        <div className='grouplist'>
            <label className='grouplist-heading' >Department</label>
            <div className='grouplist-box'>
                <ul className='grouplist-ul'>
                    <li className='grouplist-item'>department name 1 id: 11111</li>
                    <li className='grouplist-item'>department name 2 id: 11111</li>
                    <li className='grouplist-item'>department name 3 id: 11111</li>
                    <li className='grouplist-item'>department name 4 id: 11111</li>
                </ul>
            </div>
        </div>
    )
}
export default GroupList;