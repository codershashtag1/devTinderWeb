import { createSlice } from '@reduxjs/toolkit';

const connectionSlice = createSlice({
  name: 'connection',
  initialState: null,
  reducers: {
    setConnection: (state, action) => {
      return action.payload;
    },
    removeConnection: () => {
      return null;
    },
  }
});

export const { setConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;