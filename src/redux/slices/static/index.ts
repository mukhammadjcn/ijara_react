import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  regions: [],
  metro: [],
};

export const staticReducer = createSlice({
  name: "adverdReducer",
  initialState,
  reducers: {
    setRegions: (state, action) => {
      state.regions = action.payload;
    },
    setMetro: (state, action) => {
      state.metro = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRegions, setMetro } = staticReducer.actions;

export default staticReducer.reducer;
