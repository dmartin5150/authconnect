
import { User, Order} from "./orderTasks.types";
import { getUserOrders } from "./actions/orderTasks.actions";
import { AnyAction } from "redux";


export type OrderTaskState = {
    orders: Order[];
    user: User;
}

const UNASSIGNED_USER: User = {
    userId: 0,
    userName:'Unassigned',
    notStarted: {name: 'Not Started', count:0},
    pending: {name: 'Pending', count:0},
    completed: {name: 'Completed', count:0}
}

const OR_DATA_INITIAL_STATE: OrderTaskState = {
    orders: [],
    user:UNASSIGNED_USER
}

export const OrderTaskReducer = (state=OR_DATA_INITIAL_STATE, action: AnyAction):OrderTaskState =>  {
    if (getUserOrders.match(action)) {
        return { ...state, orders: action.payload}
    }
    return state;
}
