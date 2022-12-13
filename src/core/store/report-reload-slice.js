import { createSlice } from "@reduxjs/toolkit";

export const reportReloadSlice = createSlice({
  name: "reportReload",
  initialState: {
    reportMode: false,
  },
  reducers: {
    setReportMode: (state) => {
      state.reportMode = !state.reportMode;
    },
  },
});
export const { setReportMode } = reportReloadSlice.actions;

export default reportReloadSlice.reducer;
