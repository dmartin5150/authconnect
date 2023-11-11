import React from 'react';
import './NoteHistory.css';


interface NoteHistoryProps {
    onNoteHistory?: ()=> void;
}




const NoteHistory: React.FC<NoteHistoryProps> = ({onNoteHistory}) => {

    const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        console.log('Show Notes History')
    }

    return (
        <button onClick={handleClick}>
            <div className='note-button'>
                <img src="note-line-icon.png" alt="Note History"  className='note-button-png'/>
            </div>
        </button>
    )
}
export default NoteHistory;