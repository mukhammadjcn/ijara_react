import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  all: [null, null, null, null, null, null, null, null],
};

export const adverdReducer = createSlice({
  name: "adverdReducer",
  initialState,
  reducers: {
    setAdverts: (state, action) => {
      state.all = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAdverts } = adverdReducer.actions;

export default adverdReducer.reducer;
