export enum BaseRoutes {
    ROOT = "/",
    SIGNUP = "/signup",
    LOGIN = "/login",
    DASHBOARD = "/dashboard",
    HOME = "home",
    MY_TODOS = "todos",
    SHARED_TODOS = "shared",
    PROFILE = "profile",
}

export const Routes = {
    SIGNUP : BaseRoutes.SIGNUP,
    LOGIN : BaseRoutes.LOGIN,
    HOME : BaseRoutes.DASHBOARD + "/" +BaseRoutes.HOME,
    MY_TODOS : BaseRoutes.DASHBOARD + "/" +BaseRoutes.MY_TODOS,
    SHARED_TODOS : BaseRoutes.DASHBOARD + "/" +BaseRoutes.SHARED_TODOS,
    PROFILE : BaseRoutes.DASHBOARD + "/" +BaseRoutes.PROFILE,
}