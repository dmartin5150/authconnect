import { RootState } from "../../store";
import { createSelector } from "reselect";
import {  AssignTaskState } from "../AssignTasks.reducer";

const selectAssignTaskReducer = (state:RootState):AssignTaskState => state.assignTask;


export const selectGroup = createSelector(
    [selectAssignTaskReducer],
    (orderTaskSlice) => orderTaskSlice.group
);


