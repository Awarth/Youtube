import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detail: null,
};

const editTweetSlice = createSlice({
  name: "editTweet",
  initialState,
  reducers: {
    saveDetail: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const { saveDetail } = editTweetSlice.actions;
export default editTweetSlice.reducer;
