import React, {ReactNode} from "react";
import "./popup-component.css";
import classnames from "classnames";

interface PopupProps  {
    children:ReactNode;
    classIsOpen:boolean;
}

const Popup: React.FC<PopupProps> = ({children, classIsOpen}) => {
    return (
        <div className ={classnames("popup",{open:classIsOpen ? 'open' : ''})} >
            {children}
        </div>
    )
}
export default Popup;