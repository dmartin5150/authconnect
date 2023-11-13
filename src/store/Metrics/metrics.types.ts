
import { Metric, MetricStatus } from "../OrderTasks/orderTasks.types";

export enum  METRICS_TYPES {
    SET_GROUP_METRICS = 'metrics/SET_USER_METRICS'
}


export type GroupMetric = {
    userId: number;
    userName: string;
    notStartedCount: number;
    pendingCount: number;
    completedCount: number;
    scheduledCount: number;
    notScheduledCount: number;
    authTotals: number;
    scheduledTotals: number;


}

export type GroupUser = {
    userId: number;
    userName: string;
}