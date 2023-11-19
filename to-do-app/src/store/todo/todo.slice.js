import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: 'to do list',
  initialState: {
    isLoading: false,
    error: null,
    initialState: []
  },
  reducers: {
  }
})