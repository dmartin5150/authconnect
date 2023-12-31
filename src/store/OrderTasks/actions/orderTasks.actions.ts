import { ORDATA_TYPES, User, Order, CreateNoteInfo, ActionNote, ViewNoteInfo, StatusUpdateInfo } from "../orderTasks.types";
import { createAction, ActionWithPayload, withMatcher, Action } from "../../../utilities/reducer/reducerutils";





export type SetOrders = ActionWithPayload<ORDATA_TYPES.SET_USER_ORDERS, Order[]>
export type SetUser = ActionWithPayload<ORDATA_TYPES.SET_USER, User>
export type SetCreateNoteOpen = ActionWithPayload<ORDATA_TYPES.SET_CREATE_NOTE_OPEN,CreateNoteInfo>
export type SetActionNotes = ActionWithPayload<ORDATA_TYPES.SET_ACTION_NOTES, ActionNote[]>
export type SetViewNotes = ActionWithPayload<ORDATA_TYPES.SET_VIEW_NOTES, ViewNoteInfo>
export type SetStatusUpdate = ActionWithPayload<ORDATA_TYPES.SET_STATUS_UPDATE, StatusUpdateInfo>


export const setOrders= withMatcher((orders: Order[]): SetOrders => {
    return createAction(ORDATA_TYPES.SET_USER_ORDERS, orders);
});

export const setUser = withMatcher((user:User):SetUser => {
    return createAction(ORDATA_TYPES.SET_USER, user);
});



export const setCreateNoteOpen = withMatcher((noteInfo:CreateNoteInfo):SetCreateNoteOpen => {
    return createAction(ORDATA_TYPES.SET_CREATE_NOTE_OPEN, noteInfo);
})
 

export const setActionNotes = withMatcher((notes:ActionNote[]):SetActionNotes => {
    return createAction(ORDATA_TYPES.SET_ACTION_NOTES, notes);
})

export const setViewNotes = withMatcher((viewNote: ViewNoteInfo): SetViewNotes => {
    return createAction(ORDATA_TYPES.SET_VIEW_NOTES, viewNote);
})

export const setStatusUpdate = withMatcher((statusUpdate:StatusUpdateInfo): SetStatusUpdate => {
    return createAction(ORDATA_TYPES.SET_STATUS_UPDATE, statusUpdate);
})