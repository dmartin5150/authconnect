
import { User, Order, Group, CreateNoteInfo,ActionNote, ViewNoteInfo, StatusUpdateInfo, AuthStatusType,StatusUpdateTypes} from "./orderTasks.types";
import { setOrders, setUser,  setCreateNoteOpen, setActionNotes, setViewNotes, setStatusUpdate  } from "./actions/orderTasks.actions";
import { AnyAction } from "redux";
import { UNASSIGNED_USER } from "../../Data/userData";
import { ORDERS } from "../../Data/orderData";

export type OrderTaskState = {
    orders: Order[];
    user: User;
    createNoteOpen: CreateNoteInfo;
    viewNotes: ViewNoteInfo;
    notes: ActionNote[];
    statusUpdate: StatusUpdateInfo
}



const ORDER_TASKS_INITIAL_STATE: OrderTaskState = {
    orders: ORDERS,
    user:UNASSIGNED_USER,
    createNoteOpen:{orderId: -1, classIsOpen:false},
    viewNotes:{orderId: -1, classIsOpen:false},
    notes:[],
    statusUpdate: {orderId:-1, status:AuthStatusType.NOT_STARTED, type:StatusUpdateTypes.AUTH }
}

export const OrderTaskReducer = (state=ORDER_TASKS_INITIAL_STATE, action: AnyAction):OrderTaskState =>  {
    if (setOrders.match(action)) {
        return { ...state, orders: action.payload}
    }
    if (setUser.match(action)) {
        return { ...state, user: action.payload}
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
    if (setStatusUpdate.match(action)) {
        return {...state, statusUpdate:action.payload}
    }
    return state;
}
