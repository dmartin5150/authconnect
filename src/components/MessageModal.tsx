import React, {useState,useEffect} from 'react';
import Popup from './popup/popup-component';
import classnames from "classnames";
import './MessageModal.css';




interface MessageModalProps {
    classIsOpen:boolean;
    heading:string;
    messageText:string;
    onModalSubmit: (textInfo:string)=>void;
    onModalCancel: ()=>void;
}



const MessageModal: React.FC<MessageModalProps> = ({heading, messageText='',onModalSubmit,onModalCancel, classIsOpen,...props}) => {

    const [note, setNote] = useState('');


    useEffect(() => {
        if (messageText.trim().length !== 0) {
            setNote(messageText);
        }
    },[])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onModalSubmit(note);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNote(event.target.value);
    }

    const handleCancel = (event:React.MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault();
        onModalCancel();
    } 

    return (
        <Popup classIsOpen={classIsOpen}>
            <div className ={classnames("message-modal",{open:classIsOpen ? 'open' : ''})}>
            <form className='message-modal--form' onSubmit={handleSubmit}>
                <label>
                    {heading}
                </label>
                <input type="text" value={note} onChange={handleChange} />
                <div className='message-modal--buttons'>
                    <button type="submit" value="Submit" className='message-modal--button submit'>Submit</button>
                    <button className='message-modal--button' onClick={handleCancel}>Cancel</button>

                </div>
            </form>
            </div>
        </Popup>
    )
}
export default MessageModal;