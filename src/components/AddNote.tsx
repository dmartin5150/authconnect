import React from "react";
import { ICellRendererParams} from "ag-grid-community";
import { CreateNoteInfo } from "../store/OrderTasks/orderTasks.types";



interface AddNoteProps {
    onAddNote: (orderId:number, noteInfo:CreateNoteInfo) => void;
}


const AddNote: React.FC<AddNoteProps> = ({onAddNote, ...props}) => {


    const handleAddNote = (event:React.MouseEvent<HTMLButtonElement>) => {
        const orderId = (props as ICellRendererParams).data.id;
        const noteInfo:CreateNoteInfo = {orderId, classIsOpen:true};
        onAddNote(orderId, noteInfo)
    }

    return (
        <button onClick={handleAddNote}>Add Note</button>
    )
}
export default AddNote;