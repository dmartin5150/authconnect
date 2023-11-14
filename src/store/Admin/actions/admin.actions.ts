import { User, Provider, Group, Department, Patient} from "../../OrderTasks/orderTasks.types"
import { createAction, ActionWithPayload, withMatcher, Action } from "../../../utilities/reducer/reducerutils";
import { ADMIN_TYPES, EDIT_MODES } from "../admin.types";




export type SetUsers = ActionWithPayload<ADMIN_TYPES.SET_USERS, User[]>;
export type SetProviders = ActionWithPayload<ADMIN_TYPES.SET_PROVIDERS, Provider[]>;
export type SetGroups = ActionWithPayload<ADMIN_TYPES.SET_GROUPS, Group[]>;
export type SetDepartments = ActionWithPayload<ADMIN_TYPES.SET_DEPARTMENTS, Department[]>;
export type SetPatients = ActionWithPayload<ADMIN_TYPES.SET_PATIENTS, Patient[]>;
export type SetEditMode = ActionWithPayload<ADMIN_TYPES.SET_EDIT_MODE, EDIT_MODES>




export const setUsers= withMatcher((users: User[]): SetUsers => {
    return createAction(ADMIN_TYPES.SET_USERS, users);
});

export const setProviders= withMatcher((providers: Provider[]): SetProviders => {
    return createAction(ADMIN_TYPES.SET_PROVIDERS, providers);
});

export const setGroups= withMatcher((groups: Group[]): SetGroups => {
    return createAction(ADMIN_TYPES.SET_GROUPS, groups);
});

export const setDepartments= withMatcher((departments: Department[]): SetDepartments => {
    return createAction(ADMIN_TYPES.SET_DEPARTMENTS, departments);
});


export const setPatients= withMatcher((patients: Patient[]): SetPatients => {
    return createAction(ADMIN_TYPES.SET_PATIENTS, patients);
});

export const setEditMode= withMatcher((editMode: EDIT_MODES): SetEditMode => {
    return createAction(ADMIN_TYPES.SET_EDIT_MODE, editMode);
});






