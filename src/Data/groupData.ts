 import { Group} from "../store/OrderTasks/orderTasks.types";

 

export const GROUPS:Group[] = [
    {groupId:1,groupName:'Group1', providerIds: [1,3,4],departmentIds:[111111,333333],userIds:[1,3],isActive:true },
    {groupId:2,groupName:'Group2', providerIds: [2,4],departmentIds:[222222,333333],userIds:[],isActive:true },
    {groupId:3,groupName:'Group3', providerIds: [1,2],departmentIds:[222222],userIds:[],isActive:true},
    {groupId:4,groupName:'Group4', providerIds: [3,5,7],departmentIds:[111111,333333], userIds:[],isActive:true},
    {groupId:5,groupName:'Group5', providerIds: [5,6,7],departmentIds:[222222], userIds:[],isActive:true}
]

export const EMPTY_GROUP:Group =
    {groupId:0,groupName:'New Group', providerIds: [],departmentIds:[],userIds:[],isActive:true }

export const UNASSIGNED_GROUP:Group = 
{groupId:0,groupName:'Unassinged', providerIds: [],departmentIds:[],userIds:[],isActive:true }