import { createSlice} from "@reduxjs/toolkit";

const initialState = []

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        newComment: (state, action) => {
            state.unshift(action.payload);
        }
    }
})

const { actions, reducer } = commentSlice;
export const { newComment } = actions;
export default reducer;

