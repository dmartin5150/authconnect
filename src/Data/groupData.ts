 import { Group} from "../store/OrderTasks/orderTasks.types";

 

export const GROUPS:Group[] = [
    {groupId:11,groupName:'Not Assigned', providerIds: [],departmentIds:[999999],userIds:[],isActive:true },
    {groupId:2,groupName:'Cardiology', providerIds: [1,3,4],departmentIds:[111111],userIds:[1,3],isActive:true },
    {groupId:3,groupName:'TAO 2', providerIds: [2,4],departmentIds:[222222,333333],userIds:[],isActive:true },
    {groupId:4,groupName:'Department 222222', providerIds: [1,2],departmentIds:[222222],userIds:[],isActive:true},
    {groupId:5,groupName:'Gastroenterology', providerIds: [3,5,7],departmentIds:[333333], userIds:[],isActive:true},
    {groupId:6,groupName:'TAO 5', providerIds: [5,6,7],departmentIds:[222222], userIds:[],isActive:true}
]

export const EMPTY_GROUP:Group =
    {groupId:0,groupName:'New Group', providerIds: [],departmentIds:[],userIds:[],isActive:true }

export const UNASSIGNED_GROUP:Group = 
{groupId:0,groupName:'Unassigned', providerIds: [],departmentIds:[],userIds:[],isActive:true }