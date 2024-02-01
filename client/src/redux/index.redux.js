import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./auth/form.reducer.js";

export default configureStore({
  reducer: {
    form: formReducer,
  },
});
