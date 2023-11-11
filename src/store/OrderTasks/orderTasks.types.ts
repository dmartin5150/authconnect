

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
    notStarted:Metric,
    pending:Metric,
    completed:Metric
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


export type Order = {
    orderNumber: number;
    orderDate: Date;
    orderProvider: Provider;
    carrier: string;
    authStatus: 'Not Started' | 'Pending' | 'Auth Obtained' | 'Auth Denied' | 'Pending P2P';
    scheduleStatus: 'Not Scheduled' | 'Scheduled' | 'Scheduled Outside Facility';
    priority: boolean;
    department: Department;
    patient: Patient;
    assignedUser: User;
    lastUpdated:Date;
    notes: ActionNote[]
}



export type Metric = {
    name: 'Not Started' | 'Pending' | 'Completed';
    count: number
}

export type Group = {
    groupId: number;
    provider: Provider;
    user: User;
    department:Department;
    notStarted: Metric;
    pending: Metric;
    completed: Metric;

}