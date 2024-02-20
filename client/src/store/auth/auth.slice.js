import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isAuth: (state, {payload: auth }) => {
      state.value = auth
    }

  }

})

export const { actions, reducer } = authSlice