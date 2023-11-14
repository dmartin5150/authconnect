import { AnyAction } from "redux";
import { User,Group,Patient,Department,Provider } from "../OrderTasks/orderTasks.types";
import { setUsers, setDepartments,setGroups,setPatients,setProviders} from "./actions/admin.actions";
import { USERS } from "../../Data/userData";
import { DEPARTMENTS } from "../../Data/departmentData";
import { PROVIDERS } from "../../Data/providerData";
import { PATIENTS } from "../../Data/patientData";
import { GROUPS } from "../../Data/groupData";



export type AdminState = {
    users:User[],
    groups: Group[],
    patients: Patient[],
    departments: Department[],
    providers:Provider[]
}

const ADMIN_INITIAL_STATE: AdminState = {
    users: USERS,
    groups:GROUPS,
    patients:PATIENTS,
    departments: DEPARTMENTS,
    providers:PROVIDERS
}


export const AdminReducer = (state=ADMIN_INITIAL_STATE, action: AnyAction):AdminState =>  {

    if (setUsers.match(action)) {
        return { ...state, users:action.payload}
    }
    if (setGroups.match(action)) {
        return { ...state, groups:action.payload}
    }
    if (setPatients.match(action)) {
        return { ...state, patients:action.payload}
    }
    if (setDepartments.match(action)) {
        return { ...state, departments:action.payload}
    }
    if (setProviders.match(action)) {
        return { ...state, providers:action.payload}
    }

    return state;
}