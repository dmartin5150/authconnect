import {  Group} from "../OrderTasks/orderTasks.types";
import { AnyAction } from "redux";
import { GROUPS } from "../../Data/groupData";
import { setGroup } from "./actions/AssignTasks.actions";

export type AssignTaskState = {
    group:Group;
}


const ASIGN_TASKS_INITIAL_STATE: AssignTaskState = {
    group: GROUPS[0],
}

export const AssignTaskReducer = (state=ASIGN_TASKS_INITIAL_STATE, action: AnyAction):AssignTaskState =>  {
    if (setGroup.match(action)) {
        return { ...state, group: action.payload}
    }
    return state;
}