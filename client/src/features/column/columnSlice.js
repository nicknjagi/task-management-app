import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
        })
    }
})

export const {} = columnSlice.actions

export default columnSlice.reducer