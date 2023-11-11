 import { Group} from "../store/OrderTasks/orderTasks.types";

 

export const GROUPS:Group[] = [
    {groupId:1,groupName:'Group1', providerIds: [1,3,4],userIds:[1,3],departmentIds:[1,3],notStarted:0,pending:0,completed:0,scheduled:0 },
    {groupId:2,groupName:'Group2', providerIds: [2,4],userIds:[1,3,4],departmentIds:[2,3],notStarted:0,pending:0,completed:0,scheduled:0 },
    {groupId:3,groupName:'Group3', providerIds: [1,2],userIds:[2,3],departmentIds:[2,4],notStarted:0,pending:0,completed:0,scheduled:0 },
    {groupId:4,groupName:'Group4', providerIds: [3,5,7],userIds:[3,4],departmentIds:[1,3,4],notStarted:0,pending:0,completed:0,scheduled:0},
    {groupId:5,groupName:'Group5', providerIds: [5,6,7],userIds:[2,4],departmentIds:[2],notStarted:0,pending:0,completed:0,scheduled:0 }
]