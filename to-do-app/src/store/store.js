import { combineReducers, configureStore, getDefaultMiddleware, } from '@reduxjs/toolkit'
import { api } from './api/api'
import { reducer as authReducer } from "./auth/auth.slice"


const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer

})

export const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

