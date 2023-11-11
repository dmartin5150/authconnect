import { combineReducers} from "redux";
import { OrderTaskReducer } from "./OrderTasks/orderTasks.reducer";



export const rootReducer = combineReducers({
    orderTask: OrderTaskReducer
}) 