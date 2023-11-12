import { ORDATA_TYPES, User, Order, Group, CreateNoteInfo, ActionNote } from "../orderTasks.types";
import { createAction, ActionWithPayload, withMatcher, Action } from "../../../utilities/reducer/reducerutils";




export type SetOrders = ActionWithPayload<ORDATA_TYPES.SET_USER_ORDERS, Order[]>
export type SetUser = ActionWithPayload<ORDATA_TYPES.SET_USER, User>
export type SetGroup = ActionWithPayload<ORDATA_TYPES.SET_GROUP, Group>
export type SetCreateNoteOpen = ActionWithPayload<ORDATA_TYPES.SET_CREATE_NOTE_OPEN,CreateNoteInfo>
export type SetActionNotes = ActionWithPayload<ORDATA_TYPES.SET_ACTION_NOTES, ActionNote[]>


export const setOrders= withMatcher((orders: Order[]): SetOrders => {
    return createAction(ORDATA_TYPES.SET_USER_ORDERS, orders);
});

export const setUser = withMatcher((user:User):SetUser => {
    return createAction(ORDATA_TYPES.SET_USER, user);
});

export const setGroup = withMatcher((group:Group): SetGroup => {
    return createAction(ORDATA_TYPES.SET_GROUP, group);
});

export const setCreateNoteOpen = withMatcher((noteInfo:CreateNoteInfo):SetCreateNoteOpen => {
    return createAction(ORDATA_TYPES.SET_CREATE_NOTE_OPEN, noteInfo);
})
 

export const setActionNotes = withMatcher((notes:ActionNote[]):SetActionNotes => {
    return createAction(ORDATA_TYPES.SET_ACTION_NOTES, notes);
})