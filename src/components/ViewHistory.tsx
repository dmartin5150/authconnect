import React from "react";
import { ICellRendererParams} from "ag-grid-community";
import { ViewNoteInfo } from "../store/OrderTasks/orderTasks.types";
import "./ViewHistory.css";



interface AddNoteProps {
    onAddViewHistory: (orderId:number, viwInfo:ViewNoteInfo) => void;
}

const ViewHistory: React.FC<AddNoteProps> = ({onAddViewHistory, ...props}) => {


    const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const orderId = (props as ICellRendererParams).data.id;
        const viewInfo:ViewNoteInfo = {orderId, classIsOpen:true};
        onAddViewHistory(orderId, viewInfo)
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