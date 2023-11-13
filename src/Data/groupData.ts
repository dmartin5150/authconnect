 import { Group} from "../store/OrderTasks/orderTasks.types";

 

export const GROUPS:Group[] = [
    {groupId:0,groupName:'Unassigned', providerIds: [],departmentIds:[] },
    {groupId:1,groupName:'Group1', providerIds: [1,3,4],departmentIds:[1,3] },
    {groupId:2,groupName:'Group2', providerIds: [2,4],departmentIds:[2,3] },
    {groupId:3,groupName:'Group3', providerIds: [1,2],departmentIds:[2,4]},
    {groupId:4,groupName:'Group4', providerIds: [3,5,7],departmentIds:[1,3,4]},
    {groupId:5,groupName:'Group5', providerIds: [5,6,7],departmentIds:[2]}
]