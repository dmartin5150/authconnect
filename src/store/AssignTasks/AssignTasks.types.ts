
export enum  ASSIGN_TASK_TYPES {
    SET_GROUP  = 'assignTasks/SET_GROUP',
    SET_AUTH_STATUS_INFO = 'assignTasks/SET_AUTH_STATUS_INFO',
    SET_GROUP_DEPT = 'assignTasks/SET_GROUP_DEPT',
    SET_UNASSIGNED_GROUP = 'assignTasks/SET_UNASSIGNED_GROUP'
}


export type AuthStatusInfo = {
    orderId: number;
    userId: number;
}