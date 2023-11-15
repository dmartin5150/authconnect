import { RootState } from "../../store";
import { createSelector } from "reselect";
import { AdminState } from "../admin.reducer"; 
import { selectGroup } from "../../AssignTasks/selectors/AssignTasks.selectors";

const selectAdminReducer = (state:RootState):AdminState => state.admin

export const selectDepartments = createSelector(
    [selectAdminReducer],
    (adminTaskSlice) => adminTaskSlice.departments
);

export const selectProviders = createSelector(
    [selectAdminReducer],
    (adminTaskSlice) => adminTaskSlice.providers
);

export const selectUsers= createSelector(
    [selectAdminReducer],
    (adminTaskSlice) => adminTaskSlice.users
);

export const selectPatients = createSelector(
    [selectAdminReducer],
    (adminTaskSlice) => adminTaskSlice.patients
);

export const selectGroups = createSelector(
    [selectAdminReducer],
    (adminTaskSlice) => adminTaskSlice.groups.filter((group) => group.isActive)
);


export const selectGroupswithoutUnassigned = createSelector(
    [selectAdminReducer],
    (adminTaskSlice) => adminTaskSlice.groups.filter((group) => group.groupId !== 0).filter((group)=> group.isActive)
);

export const selectEditMode = createSelector(
    [selectAdminReducer,selectGroup],
    (adminTaskSlice) => adminTaskSlice.editMode
);