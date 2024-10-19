import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detail: null,
};

const editVideoSlice = createSlice({
  name: "editVideo",
  initialState,
  reducers: {
    saveDetail: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const { saveDetail } = editVideoSlice.actions;
export default editVideoSlice.reducer;
