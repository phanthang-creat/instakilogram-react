import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    path: "",
};

const pathSlice = createSlice({
    name: "path",
    initialState,
    reducers: {
        setPath: (state, action) => {
            state.path = action.payload.path;
        },
    }
});

const { actions, reducer } = pathSlice;
export const { setPath } = actions;
export default reducer;