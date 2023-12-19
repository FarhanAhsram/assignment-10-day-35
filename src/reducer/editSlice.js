import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchEdit = createAsyncThunk(
  "edit/fetchEdit",
  async ({ id, updatedData }) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Gagal mengedit user");
      }
      console.log("Data berhasil diubah");
      Swal.fire({
        title: "Data Edited Successfully",
        icon: "success",
        showConfirmButton: true,
      });

      return { id, updatedData };
    } catch (error) {
      console.log("Error pada try catch", error);
      Swal.fire({
        title: "Failed to Edit Data",
        icon: "error",
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const editSlice = createSlice({
  name: "edit",
  initialState: {
    response: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEdit.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEdit.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id, updatedData } = action.payload;

        state.response = { id, ...updatedData };
      })
      .addCase(fetchEdit.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default editSlice.reducer;
