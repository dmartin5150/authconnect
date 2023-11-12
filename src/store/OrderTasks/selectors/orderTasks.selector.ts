import { RootState } from "../../store";
import { createSelector } from "reselect";
import { OrderTaskState } from "../orderTasks.reducer";



const selectOrderTaskReducer = (state:RootState):OrderTaskState => state.orderTask;


export const selectOrders = createSelector(
    [selectOrderTaskReducer],
    (orderTaskSlice) => orderTaskSlice.orders
);

export const selectUser = createSelector(
    [selectOrderTaskReducer],
    (orderTaskSlice) => orderTaskSlice.user
);

export const selectGroup = createSelector(
    [selectOrderTaskReducer],
    (orderTaskSlice) => orderTaskSlice.group
);

export const selectCreateNoteOpen = createSelector(
    [selectOrderTaskReducer],
    (orderTaskSlice) => orderTaskSlice.createNoteOpen
);

export const selectActionNotes = createSelector(
    [selectOrderTaskReducer],
    (orderTaskSlice) => orderTaskSlice.notes
);

export const selectViewNotes = createSelector(
    [selectOrderTaskReducer],
    (orderTaskSlice) => orderTaskSlice.viewNotes
);