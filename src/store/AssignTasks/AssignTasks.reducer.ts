import {  Group} from "../OrderTasks/orderTasks.types";
import { AuthStatusInfo } from "./AssignTasks.types";
import { AnyAction } from "redux";
import { GROUPS } from "../../Data/groupData";
import { setGroup, setAuthStatusInfo, setGroupDept } from "./actions/AssignTasks.actions";

export type AssignTaskState = {
    group:Group;
    authStatusInfo:AuthStatusInfo
}


const ASIGN_TASKS_INITIAL_STATE: AssignTaskState = {
    group: GROUPS[1],
    authStatusInfo: {orderId:-1, userId:-1}
}

export const AssignTaskReducer = (state=ASIGN_TASKS_INITIAL_STATE, action: AnyAction):AssignTaskState =>  {
    if (setGroup.match(action)) {
        return { ...state, group: action.payload}
    }
    if (setAuthStatusInfo.match(action)) {
        return { ...state, authStatusInfo: action.payload}
    }
    if (setGroupDept.match(action)) {
        return {...state, group: {...state.group, departmentIds: action.payload}}
    }
    return state;
}