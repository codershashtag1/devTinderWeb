import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({   
  name: "requests",
  initialState: null,
  reducers: {
    setRequests: (state, action) => {
      return action.payload;
    },
    removeRequests: (state, action) => {
      let newState = state.filter((req) => req._id !== action.payload);
      return newState;
    },
    clearRequests: () => {
      return null;
    },
  },
});

export const {
  setRequests,
  removeRequests,
  clearRequests
} = requestsSlice.actions;
export default requestsSlice.reducer;