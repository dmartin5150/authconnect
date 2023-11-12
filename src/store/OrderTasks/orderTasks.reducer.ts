
import { User, Order, Group, CreateNoteInfo,ActionNote, ViewNoteInfo} from "./orderTasks.types";
import { setOrders, setUser, setGroup, setCreateNoteOpen, setActionNotes, setViewNotes  } from "./actions/orderTasks.actions";
import { AnyAction } from "redux";
import { UNASSIGNED_USER } from "../../Data/userData";
import { ORDERS } from "../../Data/orderData";

export type OrderTaskState = {
    orders: Order[];
    user: User;
    group: Group | {};
    createNoteOpen: CreateNoteInfo;
    viewNotes: ViewNoteInfo;
    notes: ActionNote[];
}



const OR_DATA_INITIAL_STATE: OrderTaskState = {
    orders: ORDERS,
    user:UNASSIGNED_USER,
    group: {},
    createNoteOpen:{rowIndex: -1, classIsOpen:false},
    viewNotes:{rowIndex: -1, classIsOpen:false},
    notes:[]
}

export const OrderTaskReducer = (state=OR_DATA_INITIAL_STATE, action: AnyAction):OrderTaskState =>  {
    if (setOrders.match(action)) {
        return { ...state, orders: action.payload}
    }
    if (setUser.match(action)) {
        return { ...state, user: action.payload}
    }
    if (setGroup.match(action)) {
        return { ...state, group: action.payload}
    }
    if (setCreateNoteOpen.match(action)) {
        return {...state, createNoteOpen:action.payload}
    }
    if (setActionNotes.match(action)) {
        return {...state, notes:action.payload}
    }
    if (setViewNotes.match(action)) {
        return {...state, viewNotes: action.payload}
    }
    return state;
}
