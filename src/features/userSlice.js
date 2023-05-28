import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'loggedUser',
    initialState: {
        user:{},
        token:""
    },
    reducers: {
        setUser: (state, action) => {
            console.log(action.payload);
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
    }
})


export const { setUser } = userSlice.actions
export default userSlice.reducer;