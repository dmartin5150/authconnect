import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import Popup from './popup/popup-component';
import classnames from "classnames";
import './CreateNote.css';
import { setCreateNoteOpen } from '../store/OrderTasks/actions/orderTasks.actions';
import { CreateNoteInfo } from '../store/OrderTasks/orderTasks.types';



interface CreateNoteProps {
    classIsOpen:boolean;
}



const CreateNote: React.FC<CreateNoteProps> = ({classIsOpen}) => {

    const [note, setNote] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const cancelledNote:CreateNoteInfo = {rowIndex:-1, classIsOpen:false}
        dispatch(setCreateNoteOpen(cancelledNote));
        console.log('Submitting note')
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNote(event.target.value);
    }

    const handleCancel = () => {
        const cancelledNote:CreateNoteInfo = {rowIndex:-1, classIsOpen:false}
        dispatch(setCreateNoteOpen(cancelledNote));
    } 

    return (
        <Popup classIsOpen={classIsOpen}>
            <div className ={classnames("createnote",{open:classIsOpen ? 'open' : ''})}>
            <form className='createnote--form' onSubmit={handleSubmit}>
                <label>
                    Action Note:
                </label>
                <input type="text" value={note} onChange={handleChange} />
                <div className='createnote--buttons'>
                    <button type="submit" value="Submit" className='createnote--button submit'>Submit</button>
                    <button className='createnote--button' onClick={handleCancel} >Cancel</button>
                </div>
            </form>
            </div>
        </Popup>
    )
}
export default CreateNote;