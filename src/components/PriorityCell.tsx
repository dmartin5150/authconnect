import React from 'react';
import { ICellRendererParams} from "ag-grid-community";

const PriorityCell: React.FC = ({...props}) => {

    
    return (
        (props as ICellRendererParams).data.priority && <div className='high-priority'>
            <img className='high-priority-img' src='high-importance-24.png' alt='Priority' />
        </div>
    )
}
export default PriorityCell;