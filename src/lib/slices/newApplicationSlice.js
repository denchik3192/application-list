import { postNewApplication } from "@/app/API/postNewApplication";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const postData = createAsyncThunk(
  "application/postApplications",
  async ({ nameValue, descriptionValue }, { rejectWithValue }) => {
    try {
      const response = await postNewApplication(nameValue, descriptionValue);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const newApplicationSlice = createSlice({
  name: "application",
  initialState: {
    applicationId: null,
    statuses: [],
    executors: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.status = "resolved";
        state.applicationId = action.payload;
      })
      .addCase(postData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default newApplicationSlice.reducer;
