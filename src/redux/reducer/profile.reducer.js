import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: {
        age: "",
        email: "",
        id: "",
        name: "",
        username: "",
        phone: "",
        avatar: "",
        isOwner: false,
        isFollowing: false,
    }
}

const profileReducer = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.user = action.payload;
        }
    }
})

const { actions, reducer } = profileReducer;
export const { setProfile } = actions;
export default reducer;

