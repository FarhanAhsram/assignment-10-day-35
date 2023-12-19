import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducer/loginSlice";
import userReducer from "../reducer/userSlice";
import deleteReducer from "../reducer/deleteSlice";
import editReducer from "../reducer/editSlice";

const saveTokenMiddleware = () => (next) => (action) => {
  if (action.type === "login/fetchLogin/fulfilled") {
    const response = action.payload;
    const token = response.token;

    localStorage.setItem("accessToken", token);
  }

  next(action);
};

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    delete: deleteReducer,
    edit: editReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(saveTokenMiddleware),
});
