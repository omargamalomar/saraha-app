import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { apiConfig } from '../constants/api'

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
    let data = await axios.get(`${apiConfig.BASE_URL}/message`, {
        headers: {
            token: localStorage.getItem('token')
        }
    }).then(res => res.data)
    return data
})

export const sendMessage = createAsyncThunk('messages/sendMessage', async(messageContent, recievedId) => {
    return await axios.post(`${apiConfig.BASE_URL}/message`, {
        messageContent,
        recievedId 
    })
})

let initialState = {
    messages: [],
    loading: false,
    errResponse: ''
}

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.loading = false
            state.messages = action.payload.allMessages
        })
        builder.addCase(sendMessage.pending, (state) => {
            state.loading = true
        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.loading = false
        })
        builder.addCase(sendMessage.rejected, (state, action) => {
            state.errResponse = action.payload
        })
    }
})

export default messageSlice.reducer