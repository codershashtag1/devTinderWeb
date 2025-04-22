import { createSlice } from "@reduxjs/toolkit"

const feed = createSlice({
  name: 'feed',
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload
    },
    removeUserFromFeed: (state, action) => {
      let newState = state.filter((user) => user._id !== action.payload)
      return newState
    },
    removeFeed: (state, action) => {
      return null
    }
  }
})

export const {
  addFeed,
  removeFeed,
  removeUserFromFeed
} = feed.actions

export default feed.reducer
