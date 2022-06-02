import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/auth.reducer'
import pathReducer from './reducer/path.reducer'

const rootReducer = {
    auth: authReducer,
    path: pathReducer,
};

const store = configureStore({
    reducer: rootReducer
})


export default store