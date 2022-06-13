import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    status : false,
};

const newPostSlice = createSlice({
    name: "newPost",
    initialState,
    reducers: {
        newPost: (state, action) => {
            state.status = action.payload.status;
        }
    }
})

const { actions, reducer } = newPostSlice;
export const { newPost } = actions;
export default reducer;

