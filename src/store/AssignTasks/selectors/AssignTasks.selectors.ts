import { RootState } from "../../store";
import { createSelector } from "reselect";
import {  AssignTaskState } from "../AssignTasks.reducer";
import { selectGroups } from "../../Admin/selectors/admin.selectors";

const selectAssignTaskReducer = (state:RootState):AssignTaskState => state.assignTask;


export const selectGroup = createSelector(
    [selectAssignTaskReducer],
    (orderTaskSlice) => orderTaskSlice.group
);

export const selectAuthStatusInfo = createSelector(
    [selectAssignTaskReducer],
    (orderTaskSlice) => orderTaskSlice.authStatusInfo
);


