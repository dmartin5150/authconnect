
import { AnyAction } from "redux";
import { GroupMetric } from "./metrics.types";
import { setGroupMetrics } from "./actions/metrics.actions";


export type MetricsState = {
    groupMetrics:GroupMetric[];
}


const METRICS_INITIAL_STATE: MetricsState = {
    groupMetrics: []
}

export const MetricsReducer = (state=METRICS_INITIAL_STATE, action: AnyAction):MetricsState =>  {
    if (setGroupMetrics.match(action)) {
        return { ...state, groupMetrics: action.payload}
    }
    return state;
}