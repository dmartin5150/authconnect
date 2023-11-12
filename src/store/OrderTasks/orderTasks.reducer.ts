
import { User, Order, Group, MetricStatus} from "./orderTasks.types";
import { setOrders, setUser, setGroup } from "./actions/orderTasks.actions";
import { AnyAction } from "redux";
import { UNASSIGNED_USER } from "../../Data/userData";
import { ORDERS } from "../../Data/orderData";

export type OrderTaskState = {
    orders: Order[];
    user: User;
    group: Group | {};
}



const OR_DATA_INITIAL_STATE: OrderTaskState = {
    orders: ORDERS,
    user:UNASSIGNED_USER,
    group: {}
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
    return state;
}
