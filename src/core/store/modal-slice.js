import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { showModal: false };

var modalslice = createSlice({
  name: "modal",
  initialState: initialCounterState,
  reducers: {
    openModal(state) {
      state.showModal = true;
    },
    closeModal(state) {
      state.showModal = false;
    },
  },
});

export const { openModal, closeModal } = modalslice.actions;

export default modalslice;
