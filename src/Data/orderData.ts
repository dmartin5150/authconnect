import { Order } from "../store/OrderTasks/orderTasks.types";
import { AuthStatusType, ScheduleStatusType } from "../store/OrderTasks/orderTasks.types";



// export type Order = {
//     orderNumber: number;
//     orderDate: Date;
//     providerId: number;
//     carrier: string;
//     priority: boolean;
//     departmentId: number;
//     patientId: number;
//     authStatus: AuthStatusType
//     scheduleStatus: ScheduleStatusType
//     assignedUserId: number;
//     lastUpdated:Date;
//     notes: ActionNote[]
// }
const ORDER: Order[] = [ 
    {orderNumber:1, orderDate:new Date('2023-11-01'),providerId:7, carrier:'Aetna', priority:false, departmentId:2,patientId:11111111,authStatus:AuthStatusType.NOT_STARTED, scheduleStatus:ScheduleStatusType.NOT_SCHEDULED,assignedUserId:0, lastUpdated:null, notes:[]},
]