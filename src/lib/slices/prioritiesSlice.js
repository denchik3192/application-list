import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPriorities } from "@/app/API/getPriorites";

export const fetchPriorities = createAsyncThunk(
  "priorities/fetchPriorities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPriorities();
      console.log("Fetched response:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch priorities");
    }
  }
);

export const prioritiesSlice = createSlice({
  name: "priorities",
  initialState: {
    prioritiesArr: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriorities.pending, (state) => {
        state.status = "loading";
        state.error = null; // Reset error
      })
      .addCase(fetchPriorities.fulfilled, (state, action) => {
        console.log("Fetched payload:", action.payload);

        state.status = "resolved";
        state.prioritiesArr = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
      })
      .addCase(fetchPriorities.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default prioritiesSlice.reducer;
