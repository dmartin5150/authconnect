
export enum  ASSIGN_TASK_TYPES {
    SET_GROUP  = 'assignTasks/SET_USER_ORDERS',
    SET_AUTH_STATUS_INFO = 'assignTasks/SET_AUTH_STATUS_INFO'
}


export type AuthStatusInfo = {
    orderId: number;
    userId: number;
}