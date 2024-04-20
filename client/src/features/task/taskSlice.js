import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../../_helpers/history";
import toast from "react-hot-toast";
import { getColumns } from "../column/columnSlice";

const url = 'http://localhost:5000/api/v1/tasks'

const initialState = {
    tasks:[],
    isLoading:false,
    currentTask:{}
}

export const createTask = createAsyncThunk('task/createTask', async (task,thunkAPI) => {
    try {
        const resp = await axios.post(url, task)
        thunkAPI.dispatch(getColumns(thunkAPI.getState().board.currentBoard.id))
        return resp.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}) 

export const taskSlice = createSlice({
    name:'task',
    initialState,
    reducers:{
        setCurrentTask: (state, action) => {
            state.currentTask = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTask.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createTask.fulfilled, (state, action) => {
            state.isLoading = false
            toast.success('Task has been created')
            console.log(action.payload);
        })
        .addCase(createTask.rejected, (state, action) => {
            state.isLoading = false
            toast.error(action.payload)
        })
    }
})

export const {setCurrentTask} = taskSlice.actions

export default taskSlice.reducer