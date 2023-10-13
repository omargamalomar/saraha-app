import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./messages.slice";

export const store = configureStore({
    reducer: {
        messages: messagesSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: false,
    }),
})