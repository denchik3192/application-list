import { fetchApplications } from "@/app/API/fetchApplications";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
  "applications/fetchApplications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchApplications();
      console.log("Fetched response:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    status: "loading",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "resolved";
        state.applications.push(action.payload.value);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default applicationsSlice.reducer;
