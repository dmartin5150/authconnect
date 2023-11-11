

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
    notStarted:Metric;
    pending:Metric;
    completed:Metric;
    isAdmin:boolean;
    groups: Group[];
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


export type Order = {
    apiData: OrderAPIData;
    authStatus: 'Not Started' | 'Pending' | 'Auth Obtained' | 'Auth Denied' | 'Pending P2P';
    scheduleStatus: 'Not Scheduled' | 'Scheduled' | 'Scheduled Outside Facility';
    assignedUser: User;
    lastUpdated:Date;
    notes: ActionNote[]
}



export type Metric = {
    name: 'Not Started' | 'Pending' | 'Completed' | 'Scheduled' | 'Not Scheduled' | 'Scheduled Outside Facility';
    count: number;
}

export type Group = {
    groupId: number;
    provider: Provider[];
    user: User[];
    department:Department[];
    notStarted: Metric;
    pending: Metric;
    completed: Metric;
    scheduled: Metric

}