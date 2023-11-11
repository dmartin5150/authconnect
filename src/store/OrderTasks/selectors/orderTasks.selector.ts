import { RootState } from "../../store";
import { createSelector } from "reselect";
import { OrderTaskState } from "../orderTasks.reducer";



const selectOrderTaskReducer = (state:RootState):OrderTaskState => state.orderTask;


export const selectUserOrders = createSelector(
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
