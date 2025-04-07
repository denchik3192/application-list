import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPriorities } from "@/app/API/getPriorites";
import { getExecutors } from "../../app/API/getExecutors";
import { getStatuses } from "../../app/API/getStatuses";

export const fetchPriorities = createAsyncThunk(
  "priorities/fetchPriorities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPriorities();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch priorities");
    }
  }
);

// Fetch executors
export const fetchExecutorsData = createAsyncThunk(
  "priorities/fetchExecutors",
  async (_, { rejectWithValue }) => {
    try {
      const executors = await getExecutors();
      return executors;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch statuses
export const fetchStatusesData = createAsyncThunk(
  "priorities/fetchStatuses",
  async (_, { rejectWithValue }) => {
    try {
      const statuses = await getStatuses();
      return statuses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const prioritiesSlice = createSlice({
  name: "priorities",
  initialState: {
    executors: {
      data: [],
      status: "idle",
      error: null,
    },
    statuses: {
      data: [],
      status: "idle",
      error: null,
    },

    prioritiesArr: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriorities.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPriorities.fulfilled, (state, action) => {
        state.status = "resolved";
        state.prioritiesArr = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
      })
      .addCase(fetchPriorities.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || "Something went wrong";
      });

    builder
      .addCase(fetchExecutorsData.pending, (state) => {
        state.executors.status = "loading";
        state.executors.error = null;
      })
      .addCase(fetchExecutorsData.fulfilled, (state, action) => {
        state.executors.status = "resolved";
        state.executors.data = action.payload; // Update executors data
      })
      .addCase(fetchExecutorsData.rejected, (state, action) => {
        state.executors.status = "rejected";
        state.executors.error = action.payload;
      });

    builder
      .addCase(fetchStatusesData.pending, (state) => {
        state.statuses.status = "loading";
        state.statuses.error = null;
      })
      .addCase(fetchStatusesData.fulfilled, (state, action) => {
        state.statuses.status = "resolved";
        state.statuses.data = action.payload; // Update statuses data
      })
      .addCase(fetchStatusesData.rejected, (state, action) => {
        state.statuses.status = "rejected";
        state.statuses.error = action.payload;
      });
  },
});

export default prioritiesSlice.reducer;
