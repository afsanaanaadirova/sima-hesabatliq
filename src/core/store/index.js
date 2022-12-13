import { configureStore } from "@reduxjs/toolkit";
import { filterSlice } from "./filter-slice";
import { reportReloadSlice } from "./report-reload-slice";
import modalslice from "./modal-slice";

const store = configureStore({
  reducer: {
    modal: modalslice.reducer,
    filter: filterSlice.reducer,
    report: reportReloadSlice.reducer,
  },
});
export default store;
