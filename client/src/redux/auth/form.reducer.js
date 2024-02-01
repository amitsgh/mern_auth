import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    setForm: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setForm } = formSlice.actions;
export default formSlice.reducer;
