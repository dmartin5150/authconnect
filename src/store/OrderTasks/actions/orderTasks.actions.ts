import { ORDATA_TYPES, User, Order } from "../orderTasks.types";
import { createAction, ActionWithPayload, withMatcher, Action } from "../../../utilities/reducer/reducerutils";



export type GetUserOrders = ActionWithPayload<ORDATA_TYPES.GET_USER_ORDERS, Order[]>

export const getUserOrders= withMatcher((orders: Order[]): GetUserOrders => {
    return createAction(ORDATA_TYPES.GET_USER_ORDERS, orders)
});