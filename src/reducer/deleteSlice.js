import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchDelete = createAsyncThunk(
  "delete/fetchDelete",
  async (id) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus user");
      }
      console.log("Data berhasil dihapus");
      Swal.fire({
        title: "Data Deleted Successfully",
        icon: "success",
        showConfirmButton: true,
      });

      return id;
    } catch (error) {
      console.log("Error pada try catch", error);
      Swal.fire({
        title: "Failed to Delete Data",
        icon: "error",
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const deleteSlice = createSlice({
  name: "delete",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDelete.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(fetchDelete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default deleteSlice.reducer;
