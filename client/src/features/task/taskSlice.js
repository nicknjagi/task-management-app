import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { history } from "../../_helpers/history";
import toast from "react-hot-toast";
import { getColumns } from "../column/columnSlice";

const url = 'http://localhost:5000/api/v1/tasks'

const initialState = {
    tasks:[],
    isLoading:false,
    isUpdating:false,
    isDeleting:false,
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

export const updateTask = createAsyncThunk('task/updateTask', async (task,thunkAPI) => {
    try {
        const resp = await axios.patch(`${url}/${task.id}`, task)
        thunkAPI.dispatch(getColumns(thunkAPI.getState().board.currentBoard.id))
        return resp.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}) 

export const deleteTask = createAsyncThunk('task/deleteTask', async (id,thunkAPI) => {
    try {
        const resp = await axios.delete(`${url}/${id}`)
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
            toast.success('Task created')
        })
        .addCase(createTask.rejected, (state, action) => {
            state.isLoading = false
            toast.error(action.payload)
        })
        .addCase(updateTask.pending, (state) => {
            state.isUpdating = true
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            state.isUpdating = false
            toast.success('Task updated')
        })
        .addCase(updateTask.rejected, (state, action) => {
            state.isUpdating = false
            toast.error(action.payload || 'something went wrong')
        })
        .addCase(deleteTask.pending, (state) => {
            state.isDeleting = true
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            state.isDeleting = false
            toast.success('Task deleted')
        })
        .addCase(deleteTask.rejected, (state, action) => {
            state.isDeleting = false
            toast.error(action.payload || 'something went wrong')
        })
    }
})

export const {setCurrentTask} = taskSlice.actions

export default taskSlice.reducer