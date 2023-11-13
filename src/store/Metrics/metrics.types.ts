
import { Metric, MetricStatus } from "../OrderTasks/orderTasks.types";

export enum  METRICS_TYPES {
    SET_GROUP_METRICS = 'metrics/SET_USER_METRICS'
}


export type GroupMetric = {
    userId: number;
    userName: string;
    notStarted: MetricStatus;
    notStartedCount: number;
    pending: MetricStatus;
    pendingCount: number;
    complete: MetricStatus;
    completeCount: number;
    scheduled: MetricStatus;
    scheduledCount: number;
    notScheduled: MetricStatus;
    notScheduledCount: number;
    authTotals: number;
    scheduleTotals: number;


}