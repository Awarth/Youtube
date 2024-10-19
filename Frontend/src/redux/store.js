import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import searchReducer from "./slices/searchSlice";
import editVideoReducer from "./slices/editVideoDetail";
import editTweetReducer from "./slices/editTweetDetail";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    editVideo: editVideoReducer,
    editTweet: editTweetReducer,
  },
});
