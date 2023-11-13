import { METRICS_TYPES, GroupMetric } from "../metrics.types";

import { createAction, ActionWithPayload, withMatcher, Action } from "../../../utilities/reducer/reducerutils";

export type SetGroupMetrics = ActionWithPayload<METRICS_TYPES.SET_GROUP_METRICS, GroupMetric[]>;


export const setGroupMetrics= withMatcher((groupMetrics: GroupMetric[]): SetGroupMetrics => {
    return createAction(METRICS_TYPES.SET_GROUP_METRICS, groupMetrics);
});
