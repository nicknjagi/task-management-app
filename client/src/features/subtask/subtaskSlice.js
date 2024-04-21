import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/api/v1/subtasks'

const initialState = {
    subtasks:[],
    isUpdating:false
}

export const updateSubtask = createAsyncThunk('subtask/updateSubtask', async (subtask, thunkAPI) => {
    try {
        const resp = await axios.patch(`${url}/${subtask.id}`, subtask)
        return resp.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.msg || 'something went wrong')
    }
})

export const subtaskSlice = createSlice({
    name:'subtask',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(updateSubtask.pending, (state) => {
            state.isUpdating = true
        })
        .addCase(updateSubtask.fulfilled, (state, action) => {
            state.isUpdating = false
        })
        .addCase(updateSubtask.rejected, (state, action) => {
            state.isUpdating = false
        })
    }
})

export default subtaskSlice.reducer