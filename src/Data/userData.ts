import { User } from "../store/OrderTasks/orderTasks.types";



export const USERS: User[] = [
    {userId:0, userName:'unassigned', isAdmin:false,groupIds:[]},
    {userId:1, userName:'user1', isAdmin:false,groupIds:[1,2]},
    {userId:2, userName:'user2',isAdmin:false,groupIds:[2]},
    {userId:3, userName:'user3',isAdmin:false,groupIds:[3]},
    {userId:4, userName:'user4', isAdmin:false,groupIds:[3,4]},
    {userId:5, userName:'user5',isAdmin:false,groupIds:[1,2]},
]

export const UNASSIGNED_USER: User = {
    userId: 0,
    userName:'Unassigned',
    isAdmin: false,
    groupIds: []
}