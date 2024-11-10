export enum BaseRoutes {
    ROOT = "/",
    LOGIN = "/login",
    DASHBOARD = "/dashboard",
    HOME = "home",
    MY_TODOS = "todos",
    SHARED_TODOS = "shared",
}

export const Routes = {
    LOGIN : BaseRoutes.LOGIN,
    HOME : BaseRoutes.DASHBOARD + "/" +BaseRoutes.HOME,
    MY_TODOS : BaseRoutes.DASHBOARD + "/" +BaseRoutes.MY_TODOS,
    SHARED_TODOS : BaseRoutes.DASHBOARD + "/" +BaseRoutes.SHARED_TODOS,
}