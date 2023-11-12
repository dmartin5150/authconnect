import React from "react";
import { ICellRendererParams} from "ag-grid-community";
import { ViewNoteInfo } from "../store/OrderTasks/orderTasks.types";
import "./ViewHistory.css";



interface AddNoteProps {
    onAddViewHistory: (rowIndex:number, viwInfo:ViewNoteInfo) => void;
}

const ViewHistory: React.FC<AddNoteProps> = ({onAddViewHistory, ...props}) => {


    const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        // console.log('clicked')
        const rowIndex = (props as ICellRendererParams).node.rowIndex;
        if (!rowIndex) {
            if (rowIndex === 0) {
                const viewInfo:ViewNoteInfo = {rowIndex:rowIndex, classIsOpen:true};
                onAddViewHistory(rowIndex, viewInfo)
            }
        } else {
            const viewInfo:ViewNoteInfo = {rowIndex:rowIndex, classIsOpen:true};
            onAddViewHistory(rowIndex, viewInfo)
        }
    }

    return (
        <button onClick={handleClick}>
        <div className='view-button'>
            <img src="note-line-icon.png" alt="Note History"  className='view-button-png'/>
        </div>
    </button>
    )
}
export default ViewHistory;