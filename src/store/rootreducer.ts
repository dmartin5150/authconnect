import { combineReducers} from "redux";
import { OrderTaskReducer } from "./OrderTasks/orderTasks.reducer";
import { AssignTaskReducer } from "./AssignTasks/AssignTasks.reducer";
import { MetricsReducer } from "./Metrics/metrics.reducer";
import { AdminReducer } from "./Admin/admin.reducer";



export const rootReducer = combineReducers({
    orderTask: OrderTaskReducer,
    assignTask: AssignTaskReducer,
    metrics: MetricsReducer,
    admin: AdminReducer
}) 