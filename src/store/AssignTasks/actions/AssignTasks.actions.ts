import { Group } from "../../OrderTasks/orderTasks.types";
import { ASSIGN_TASK_TYPES } from "../AssignTasks.types";
import { createAction, ActionWithPayload, withMatcher, Action } from "../../../utilities/reducer/reducerutils";


export type SetGroup = ActionWithPayload<ASSIGN_TASK_TYPES.SET_GROUP, Group>

export const setGroup= withMatcher((group: Group): SetGroup => {
    return createAction(ASSIGN_TASK_TYPES.SET_GROUP, group);
});
