import React from 'react';
import './GroupList.css'


export type GroupItem = {
    description: string;
    itemId: string;
}


interface GroupListProps {
    title:string;
    groupItems: GroupItem[]
}



const GroupList: React.FC<GroupListProps> = ({title, groupItems}) => {
    return(
        <div className='grouplist'>
            <label className='grouplist-heading'>{title}</label>
            <div className='grouplist-box'>
                <ul className='grouplist-ul'>
                    {groupItems.map((item, idx) => 
                        <li key={idx} className='grouplist-item'>{item.description}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}
export default GroupList;