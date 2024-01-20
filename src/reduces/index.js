import { combineReducers } from "@reduxjs/toolkit";
import DentistReducer from "./DentistReducer";
import ClinicReducer from "./ClientReducer";
import localStorage from "redux-persist/es/storage";
import ReloadReducer from "./ReloadReducer";

export const patientPersistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: [
    "choose_treatment",
    "dob",
    "email",
    "name_date",
    "name_kanji",
    "name_kata",
    "name_treatment",
    "phone",
    "sex",
    "time_end",
    "time_slot",
    "time_start",
    "accessCode",
  ],
};

const rootReducer = combineReducers({
  reloadCount: ReloadReducer,
  dentist: DentistReducer,
  client: ClinicReducer,
});

export default rootReducer;
