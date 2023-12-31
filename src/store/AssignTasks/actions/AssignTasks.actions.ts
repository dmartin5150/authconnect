import { Group } from "../../OrderTasks/orderTasks.types";
import { ASSIGN_TASK_TYPES, AuthStatusInfo } from "../AssignTasks.types";
import { createAction, ActionWithPayload, withMatcher, Action } from "../../../utilities/reducer/reducerutils";


export type SetGroup = ActionWithPayload<ASSIGN_TASK_TYPES.SET_GROUP, Group>
export type SetAuthStatusInfo = ActionWithPayload<ASSIGN_TASK_TYPES.SET_AUTH_STATUS_INFO,AuthStatusInfo>
export type SetGroupDept = ActionWithPayload<ASSIGN_TASK_TYPES.SET_GROUP_DEPT, number[]>
export type SetUnassignedGroup = ActionWithPayload<ASSIGN_TASK_TYPES.SET_UNASSIGNED_GROUP, Group>

export const setGroup= withMatcher((group: Group): SetGroup => {
    return createAction(ASSIGN_TASK_TYPES.SET_GROUP, group);
});

export const setAuthStatusInfo= withMatcher((statusInfo: AuthStatusInfo): SetAuthStatusInfo => {
    return createAction(ASSIGN_TASK_TYPES.SET_AUTH_STATUS_INFO, statusInfo);
});

export const setUnassigned= withMatcher((unassigned: Group): SetUnassignedGroup => {
    return createAction(ASSIGN_TASK_TYPES.SET_UNASSIGNED_GROUP, unassigned);
});



