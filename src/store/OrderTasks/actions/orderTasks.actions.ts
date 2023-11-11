import { ORDATA_TYPES, User, Order, Group } from "../orderTasks.types";
import { createAction, ActionWithPayload, withMatcher, Action } from "../../../utilities/reducer/reducerutils";




export type SetUserOrders = ActionWithPayload<ORDATA_TYPES.SET_USER_ORDERS, Order[]>
export type SetUser = ActionWithPayload<ORDATA_TYPES.SET_USER, User>
export type SetGroup = ActionWithPayload<ORDATA_TYPES.SET_GROUP, Group>


export const setUserOrders= withMatcher((orders: Order[]): SetUserOrders => {
    return createAction(ORDATA_TYPES.SET_USER_ORDERS, orders);
});

export const setUser = withMatcher((user:User):SetUser => {
    return createAction(ORDATA_TYPES.SET_USER, user);
})

export const setGroup = withMatcher((group:Group): SetGroup => {
    return createAction(ORDATA_TYPES.SET_GROUP, group);
})
