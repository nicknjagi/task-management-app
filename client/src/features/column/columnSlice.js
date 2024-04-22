import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
    columns:[],
    isLoading:true
}

export const getColumns = createAsyncThunk('column/getColumns', async (boardId,thunkAPI) => {
    try {
        const resp = await axios.get(`${process.env.REACT_APP_URL}/api/v1/columns/${boardId}`)
        return resp.data.columns
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

// export const {} = columnSlice.actions

export default columnSlice.reducer