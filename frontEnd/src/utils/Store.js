import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./SearchSlice";

const appStore = configureStore({
  reducer: {
    search: searchSlice,
  },
});

export default appStore;
