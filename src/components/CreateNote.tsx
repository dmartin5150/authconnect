import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Popup from './popup/popup-component';
import classnames from "classnames";
import './CreateNote.css';
import { setCreateNoteOpen, setActionNotes, setOrders} from '../store/OrderTasks/actions/orderTasks.actions';
import { CreateNoteInfo } from '../store/OrderTasks/orderTasks.types';
import { selectUser,selectOrders,selectActionNotes,selectCreateNoteOpen } from '../store/OrderTasks/selectors/orderTasks.selector';
import { User,ActionNote } from '../store/OrderTasks/orderTasks.types';




interface CreateNoteProps {
    classIsOpen:boolean;
}



const CreateNote: React.FC<CreateNoteProps> = ({classIsOpen}) => {

    const [note, setNote] = useState('');
    const dispatch = useDispatch();
    const curUser = useSelector(selectUser);
    const curOrders = useSelector(selectOrders);
    const actionNotes = useSelector(selectActionNotes);
    const noteInfo = useSelector(selectCreateNoteOpen)

    const createActionNote = () => {
        const orderId = curOrders[noteInfo.rowIndex].id;
        const now = new Date();
        const newNote:ActionNote = {orderId, userName:curUser.userName, data:note, timeStamp:now}
        dispatch(setActionNotes([...actionNotes, newNote]))
        const newOrder = curOrders[noteInfo.rowIndex];
        newOrder.lastUpdated = now;
        dispatch(setOrders([...curOrders, newOrder]));
    }



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (note.trim().length === 0) {
            return
        }
        createActionNote();
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