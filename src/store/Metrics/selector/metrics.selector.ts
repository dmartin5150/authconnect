import { RootState } from "../../store";
import { createSelector } from "reselect";
import { MetricsState } from "../metrics.reducer";

const selectMetricTaskReducer = (state:RootState):MetricsState => state.metrics;


export const selectOrders = createSelector(
    [selectMetricTaskReducer],
    (orderTaskSlice) => orderTaskSlice.groupMetrics
);


