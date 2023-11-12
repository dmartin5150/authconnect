import React from "react";
import { ICellRendererParams} from "ag-grid-community";
import { CreateNoteInfo } from "../store/OrderTasks/orderTasks.types";



interface AddNoteProps {
    onAddNote: (rowIndex:number, noteInfo:CreateNoteInfo) => void;
}


const AddNote: React.FC<AddNoteProps> = ({onAddNote, ...props}) => {


    const handleAddNote = (event:React.MouseEvent<HTMLButtonElement>) => {
        const rowIndex = (props as ICellRendererParams).node.rowIndex;
        if (!rowIndex) {
            if (rowIndex === 0) {
                const noteInfo:CreateNoteInfo = {rowIndex:rowIndex, classIsOpen:true};
                onAddNote(rowIndex, noteInfo)
            }
        } else {
            const noteInfo:CreateNoteInfo = {rowIndex:rowIndex, classIsOpen:true};
            onAddNote(rowIndex, noteInfo)
        }
    }

    return (
        <button onClick={handleAddNote}>Add Note</button>
    )
}
export default AddNote;