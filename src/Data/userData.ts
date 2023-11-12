import { User } from "../store/OrderTasks/orderTasks.types";



export const USERS: User[] = [
    {userId:0, userName:'unassigned',notStarted:0, pending:4,completed:0, isAdmin:false,groupIds:[]},
    {userId:1, userName:'user1',notStarted:0, pending:4,completed:0, isAdmin:false,groupIds:[1,2]},
    {userId:2, userName:'user2',notStarted:2, pending:0,completed:7, isAdmin:false,groupIds:[2]},
    {userId:3, userName:'user3',notStarted:3, pending:2,completed:0, isAdmin:false,groupIds:[3]},
    {userId:4, userName:'user4',notStarted:1, pending:5,completed:3, isAdmin:false,groupIds:[3,4]},
    {userId:5, userName:'user5',notStarted:0, pending:0,completed:4, isAdmin:false,groupIds:[1,2]},
]

export const UNASSIGNED_USER: User = {
    userId: 0,
    userName:'Unassigned',
    notStarted: 0,
    pending: 0,
    completed: 0,
    isAdmin: false,
    groupIds: []
}