import React from "react";
import { ActionNote } from "../store/OrderTasks/orderTasks.types";

interface AddNoteProps  {
    onAddNote?: ()=>void;
}


const AddNote: React.FC<AddNoteProps> = ({onAddNote}) => {

    const handleAddNote = (event:React.MouseEvent<HTMLButtonElement>) => {
        console.log('adding new note')
    }

    return (
        <button onClick={handleAddNote}>Add Note</button>
    )
}
export default AddNote;