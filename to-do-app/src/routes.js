import { TODO_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE } from "./routes/consts"
import { SignUp, Login, ToDo } from "./pages"




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
  }
]