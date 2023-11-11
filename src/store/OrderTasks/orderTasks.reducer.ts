
import { User, Order, Group} from "./orderTasks.types";
import { setUserOrders, setUser, setGroup } from "./actions/orderTasks.actions";
import { AnyAction } from "redux";


export type OrderTaskState = {
    orders: Order[];
    user: User;
    group: Group | {};
}

const UNASSIGNED_USER: User = {
    userId: 0,
    userName:'Unassigned',
    notStarted: {name: 'Not Started', count:0},
    pending: {name: 'Pending', count:0},
    completed: {name: 'Completed', count:0},
    isAdmin: false,
    groups: []
}

const OR_DATA_INITIAL_STATE: OrderTaskState = {
    orders: [],
    user:UNASSIGNED_USER,
    group: {}
}

export const OrderTaskReducer = (state=OR_DATA_INITIAL_STATE, action: AnyAction):OrderTaskState =>  {
    if (setUserOrders.match(action)) {
        return { ...state, orders: action.payload}
    }
    if (setUser.match(action)) {
        return { ...state, user: action.payload}
    }
    if (setGroup.match(action)) {
        return { ...state, group: action.payload}
    }
    return state;
}
