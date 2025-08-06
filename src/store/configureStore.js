import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from './employees'
import taskReducer from './tasks'
import log from "../middleware/log";
import logger from "redux-logger";
import errorLogger from "../middleware/errorLogger"

const store = configureStore({
    reducer: {
        tasks: taskReducer,
        employees: employeeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(errorLogger),
})

export default store