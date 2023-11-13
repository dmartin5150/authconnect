import { combineReducers} from "redux";
import { OrderTaskReducer } from "./OrderTasks/orderTasks.reducer";
import { AssignTaskReducer } from "./AssignTasks/AssignTasks.reducer";



export const rootReducer = combineReducers({
    orderTask: OrderTaskReducer,
    assignTask: AssignTaskReducer
}) 