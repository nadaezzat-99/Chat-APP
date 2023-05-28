import { createSlice } from "@reduxjs/toolkit";

export const chatsSlice = createSlice({
    name: 'chats',
    initialState: {
        chats: [],
        searchTerm: "",
    },
    reducers: {
        setChats: (state, action) => {
            console.log(action.payload);
            state.chats = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    }
})


export const { setChats, setSearchTerm } = chatsSlice.actions
export default chatsSlice.reducer;