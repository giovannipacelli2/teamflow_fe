export enum BaseRoutes {
    ROOT = "/",
    SIGNUP = "/signup",
    LOGIN = "/login",
    DASHBOARD = "/dashboard",
    HOME = "home",
    MY_TODOS = "todos",
    SHARED_TODOS = "shared",
    CHECKED_TODOS = "checked",
    PROFILE = "profile",
}

export const Routes = {
    SIGNUP : BaseRoutes.SIGNUP,
    LOGIN : BaseRoutes.LOGIN,
    HOME : BaseRoutes.DASHBOARD + "/" +BaseRoutes.HOME,
    MY_TODOS : BaseRoutes.DASHBOARD + "/" +BaseRoutes.MY_TODOS,
    SHARED_TODOS : BaseRoutes.DASHBOARD + "/" +BaseRoutes.SHARED_TODOS,
    CHECKED_TODOS : BaseRoutes.DASHBOARD + "/" +BaseRoutes.CHECKED_TODOS,
    PROFILE : BaseRoutes.DASHBOARD + "/" +BaseRoutes.PROFILE,
}