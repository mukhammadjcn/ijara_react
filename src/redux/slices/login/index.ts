import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  all: {},
  phone: 0,
  user: {
    agent_logo: "",
    agent_name: "",
    id: "",
    name: "",
    ad_count: { active: 0, inactive: 0, waiting: 0, rejected: 0 },
    phone_number: "",
  },
  isApplied: false,
  openModal: false,
};

export const orderSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    add: (state: any, action) => {
      state.all[action.payload.id] = action.payload;
    },
    set: (state, action) => {
      state.all = action.payload;
    },
    remove: (state: any, action: PayloadAction<string>) => {
      delete state.all[action.payload];
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setApplied: (state, action) => {
      state.isApplied = action.payload;
    },
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, set, remove, setPhone, setUser, setApplied, setOpenModal } =
  orderSlice.actions;

export default orderSlice.reducer;
