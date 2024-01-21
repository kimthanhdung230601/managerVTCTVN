import { combineReducers } from "@reduxjs/toolkit";
import DentistReducer from "./DentistReducer";
import ClinicReducer from "./ClientReducer";
import localStorage from "redux-persist/es/storage";
import persistReducer from "redux-persist/es/persistReducer";

import loadCountReducer from "./ReloadReducer";

export const PersistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["loadCount"],
};

const rootReducer = combineReducers({
  reloadCount: persistReducer(PersistConfig, loadCountReducer),
});

export default rootReducer;
