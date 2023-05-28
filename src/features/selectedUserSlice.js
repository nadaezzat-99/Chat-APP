import { createSlice } from "@reduxjs/toolkit";


export const selectedChatSlice = createSlice({
    name: 'selecteduser',
    initialState: {
        currentChat:{},
        previousChat:{}
    },
    reducers: {
        setSelectedChat: (state, action) => {
            state.previousChat = state.currentChat
            state.currentChat = action.payload;
        },
    }
})


export const { setSelectedChat } = selectedChatSlice.actions
export default selectedChatSlice.reducer;