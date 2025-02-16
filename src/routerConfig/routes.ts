export enum BaseRoutes {
    ROOT = "/",
    SIGNUP = "/signup",
    LOGIN = "/login",
    DASHBOARD = "/dashboard",
    HOME = "home",
    MY_TASKS = "tasks",
    SHARED_TASKS = "shared",
    CHECKED_TASKS = "checked",
    PROFILE = "profile",
}

export const Routes = {
    SIGNUP : BaseRoutes.SIGNUP,
    LOGIN : BaseRoutes.LOGIN,
    HOME : BaseRoutes.DASHBOARD + "/" +BaseRoutes.HOME,
    MY_TASKS : BaseRoutes.DASHBOARD + "/" +BaseRoutes.MY_TASKS,
    SHARED_TASKS : BaseRoutes.DASHBOARD + "/" +BaseRoutes.SHARED_TASKS,
    CHECKED_TASKS : BaseRoutes.DASHBOARD + "/" +BaseRoutes.CHECKED_TASKS,
    PROFILE : BaseRoutes.DASHBOARD + "/" +BaseRoutes.PROFILE,
}