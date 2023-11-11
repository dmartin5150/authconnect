

export enum  ORDATA_TYPES {
    SET_USER_ORDERS  = 'orderTasks/SET_USER_ORDERS',
    SET_USER = 'orderTasks/SET_USER',
    SET_GROUP = 'orderTasks/SET_GROUP'
}

export type Provider = {
    id: number;
    firstName: string;
    lastName: string;
    NPI: string;
    Specialty: string;
}



export type User = {
    userId: number;
    userName: string;
    notStarted:number;
    pending:number;
    completed:number;
    isAdmin:boolean;
    groupIds: number[];
}


export type ActionNote = {
    user: User;
    timeStamp: Date;
    data: string;
}

export type Department = {
    departmentName: string;
    departmentId: number;
}

export type Patient = {
    firstName: string;
    lastName: string;
    athenaId: number;
}

type OrderAPIData = {
    orderNumber: number;
    orderDate: Date;
    orderProvider: Provider;
    carrier: string;
    priority: boolean;
    department: Department;
    patient: Patient;
}


export enum AuthStatusType  {
    NOT_STARTED = 'Not Started',
    PENDING =  'Pending',
    OBTAINED =  'Auth Obtained',
    DENIED =  'Auth Denied',
    PENDING_P2P = 'Pending P2P'
}

export enum ScheduleStatusType  {
    NOT_SCHEDULED = 'Not Scheduled',
    SCHEDULED =  'Scheduled',
    OUTSIDE_FACILITY =  'Scheduled Outside Facility'
}



export type Order = {
    orderNumber: number;
    orderName: string;
    orderDate: Date;
    providerId: number;
    carrier: string;
    priority: boolean;
    departmentId: number;
    patientId: number;
    authStatus: AuthStatusType
    scheduleStatus: ScheduleStatusType
    assignedUserId: number;
    lastUpdated:Date | null;
    notes: ActionNote[];
    patientName:string;
}


export enum MetricStatus {
    NOT_STARTED = 'Not Started',
    PENDING =  'Pending',
    COMPLETED =  'Completed',
    NOT_SCHEDULED = 'Not Scheduled',
    SCHEDULED =  'Scheduled',
    OUTSIDE_FACILITY =  'Scheduled Outside Facility'
}



export type Metric = {
    name: MetricStatus;
    count: number;
}

export type Group = {
    groupId: number;
    groupName:string;
    providerIds: number[];
    userIds: number[];
    departmentIds:number[];
    notStarted: number;
    pending: number;
    completed: number;
    scheduled: number;
}

