import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isAuth: (state) => {
      state.value = localStorage.getItem('user') ? true : false
    }
  }

})

export const { actions, reducer } = authSlice