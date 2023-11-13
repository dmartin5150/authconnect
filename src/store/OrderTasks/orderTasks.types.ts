

export enum  ORDATA_TYPES {
    SET_USER_ORDERS  = 'orderTasks/SET_USER_ORDERS',
    SET_USER = 'orderTasks/SET_USER',
    SET_CREATE_NOTE_OPEN = 'orderTasks/SET_CREATE_NOTE_OPEN',
    SET_ACTION_NOTES = 'orderTasks/SET_ACTION_NOTES',
    SET_VIEW_NOTES = 'orderTasks/SET_VIEW_NOTES',
    SET_STATUS_UPDATE = 'orderTasks/SET_STATUS_UPDATE',
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
    isAdmin:boolean;
    groupIds: number[];
}


export type ActionNote = {
    orderId: number;
    userName: string;
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
    PENDING_P2P = 'Pending P2P',
    NO_AUTH_REQUIRED = 'No Auth Required'
}

export enum ScheduleStatusType  {
    NOT_SCHEDULED = 'Not Scheduled',
    SCHEDULED =  'Scheduled',
    OUTSIDE_FACILITY =  'Scheduled Outside Facility'
}



export type Order = {
    id:number;
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
    patientName:string;
}









export type CreateNoteInfo = {
    orderId:number;
    classIsOpen:boolean;
}


export type ViewNoteInfo = {
    orderId:number;
    classIsOpen:boolean;
}

export enum StatusUpdateTypes  {
    AUTH = 'Auth',
    SCHEDULED = 'Scheduled'
}

export type StatusUpdateInfo = {
    orderId:number;
    status:AuthStatusType | ScheduleStatusType;
    type: StatusUpdateTypes
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


export type UserMetrics = {
    userId: number;
    userName:string;
    metric: Metric;
}


export type Group = {
    groupId: number;
    groupName:string;
    providerIds: number[];
    departmentIds:number[];
}

