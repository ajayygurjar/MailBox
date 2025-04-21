import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    receiveMails: [],
    messageCount: 0,
    mailMessage: {},
    visible: false,
};

const unreadSlice = createSlice({
    name: 'Unread',
    initialState,
    reducers: {
        setMails(state, action) {
            state.receiveMails = action.payload;
        },
        unreadMessage(state, action) {
            state.messageCount = action.payload;
        },
        mailDetail(state, action) {
            state.mailMessage = action.payload;
        },
        visibility(state) {
            state.visible = !state.visible;
        }
    }
});

export const messageActions = unreadSlice.actions;
export default unreadSlice.reducer;
