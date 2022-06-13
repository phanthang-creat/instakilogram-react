import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/auth.reducer'
import pathReducer from './reducer/path.reducer'
import profileReducer from './reducer/profile.reducer'
import commentReducer from './reducer/comment.reducer'
import postReducer from './reducer/newPost.reducer'

const rootReducer = {
    auth: authReducer,
    path: pathReducer,
    profile: profileReducer,
    comment: commentReducer,
    newPost: postReducer
};

const store = configureStore({
    reducer: rootReducer
})


export default store