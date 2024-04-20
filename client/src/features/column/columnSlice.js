import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const url = 'http://localhost:5000/api/v1/columns'

const initialState = {
    columns:[],
    isLoading:true
}

export const getColumns = createAsyncThunk('column/getColumns', async (boardId,thunkAPI) => {
    try {
        if(!boardId){
            // fetch boards if undefined to get the current board id
            const boards = await axios.get(`http://localhost:5000/api/v1/boards`)
            const id = boards.data.boards[0].id
            const resp = await axios.get(`${url}/${id}`)
            return resp.data.columns
        }else {
            const resp = await axios.get(`${url}/${boardId}`)
            return resp.data.columns
        }
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.msg || 'something went wrong')
    }
})

export const columnSlice = createSlice({
    name:'column',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getColumns.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getColumns.fulfilled, (state, action) => {
            state.columns = action.payload
            state.isLoading = false
        })
        .addCase(getColumns.rejected, (state, action) => {
            state.isLoading = false
            toast.error(action.payload || 'something went wrong')
        })
    }
})

export const {} = columnSlice.actions

export default columnSlice.reducer