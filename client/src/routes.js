import { TODO_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE, LIST_ROUTE } from "./routes/consts"
import { SignUp, Login, ToDo, ListPage } from "./pages"




export const PublicRoutes = [
  {
    path: SIGNUP_ROUTE,
    Component: SignUp
  },
  {
    path: LOGIN_ROUTE,
    Component: Login
  }
]

export const AuthRoutes = [
  {
    path: TODO_ROUTE,
    Component: ToDo
  },
  {
    path: LIST_ROUTE + '/:id',
    Component: ListPage
  }
]
