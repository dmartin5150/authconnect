import { Order } from "../store/OrderTasks/orderTasks.types";
import { AuthStatusType, ScheduleStatusType } from "../store/OrderTasks/orderTasks.types";

export const EMPTY_ORDER: Order = 
{id:0, orderNumber:0, orderName:'Blank', orderDate:new Date('2023-11-01'),providerId:0,patientName:'', carrier:'', priority:false, departmentId:0,patientId:0,authStatus:AuthStatusType.NOT_STARTED, scheduleStatus:ScheduleStatusType.NOT_SCHEDULED,assignedUserId:0, lastUpdated:null}

export const ORDERS: Order[] = [ 
    {id:1, orderNumber:1, orderName:'MRI Brain', orderDate:new Date('2023-11-01'),providerId:7,patientName:'', carrier:'Aetna', priority:false, departmentId:222222,patientId:11111111,authStatus:AuthStatusType.NOT_STARTED, scheduleStatus:ScheduleStatusType.NOT_SCHEDULED,assignedUserId:0, lastUpdated:null},
    {id:2, orderNumber:2, orderName:'Echo', orderDate:new Date('2023-11-02'),providerId:1,patientName:'', carrier:'Aetna', priority:false, departmentId:111111,patientId:11111112,authStatus:AuthStatusType.NOT_STARTED, scheduleStatus:ScheduleStatusType.NOT_SCHEDULED,assignedUserId:0, lastUpdated:null},
    {id:3, orderNumber:3, orderName:'CT Brain', orderDate:new Date('2023-11-02'),providerId:2, patientName:'',carrier:'BC BS', priority:true, departmentId:111111,patientId:11111113,authStatus:AuthStatusType.NOT_STARTED, scheduleStatus:ScheduleStatusType.NOT_SCHEDULED,assignedUserId:0, lastUpdated:null},
    {id:4, orderNumber:4, orderName:'MRI Lumbar Spine', orderDate:new Date('2023-11-03'),providerId:7, patientName:'', carrier:'BC BS', priority:false, departmentId:333333,patientId:11111113,authStatus:AuthStatusType.NOT_STARTED, scheduleStatus:ScheduleStatusType.NOT_SCHEDULED,assignedUserId:0, lastUpdated:null},
    {id:5, orderNumber:5, orderName:'Xray Hand', orderDate:new Date('2023-11-03'),providerId:9, patientName:'', carrier:'Medicare', priority:true, departmentId:999999,patientId:11111114,authStatus:AuthStatusType.NOT_STARTED, scheduleStatus:ScheduleStatusType.NOT_SCHEDULED,assignedUserId:0, lastUpdated:null},
    {id:6, orderNumber:6, orderName:'MRI Brain', orderDate:new Date('2023-11-05'),providerId:4, patientName:'',carrier:'Medicare', priority:false, departmentId:333333,patientId:11111115,authStatus:AuthStatusType.NOT_STARTED, scheduleStatus:ScheduleStatusType.NOT_SCHEDULED,assignedUserId:0, lastUpdated:null},
    {id:7, orderNumber:7, orderName:'CT Sinuses', orderDate:new Date('2023-11-07'),providerId:5, patientName:'',carrier:'SmartHealth', priority:false, departmentId:111111,patientId:11111115,authStatus:AuthStatusType.NOT_STARTED, scheduleStatus:ScheduleStatusType.NOT_SCHEDULED,assignedUserId:0, lastUpdated:null},
    {id:8, orderNumber:8, orderName:'Carotid Duplex', orderDate:new Date('2023-11-09'),providerId:6, patientName:'',carrier:'SmartHealth', priority:false, departmentId:222222,patientId:11111112,authStatus:AuthStatusType.NOT_STARTED, scheduleStatus:ScheduleStatusType.NOT_SCHEDULED,assignedUserId:0, lastUpdated:null},
    {id:9, orderNumber:9, orderName:'CT Brain', orderDate:new Date('2023-11-09'),providerId:7,patientName:'', carrier:'Medicaid', priority:false, departmentId:333333,patientId:11111116,authStatus:AuthStatusType.NOT_STARTED, scheduleStatus:ScheduleStatusType.NOT_SCHEDULED,assignedUserId:0, lastUpdated:null},
]