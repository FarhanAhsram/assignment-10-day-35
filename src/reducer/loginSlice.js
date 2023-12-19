import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (userData) => {
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Login Gagal");
      }
      console.log("Login Berhasil");
      Swal.fire({
        title: "Login Successful",
        icon: "success",
        showConfirmButton: true,
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.log("Error pada try catch", error);
      Swal.fire({
        title: "Login Unsuccessful",
        icon: "error",
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default loginSlice.reducer;
