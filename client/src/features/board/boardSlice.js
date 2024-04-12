import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'

const url = 'http://localhost:5000/api/v1/boards'

const initialState = {
    boards: [],
    isLoading:true,
    currentBoard:{}
}

export const getBoards = createAsyncThunk('board/getBoards', async () => {
    try {
        const resp = await axios.get(url)
        return resp.data
    } catch (error) {
        console.log(error);
    }
})


export const boardSlice = createSlice({
    name:'board',
    initialState,
    reducers: {
        setCurrentBoard: (state, action) => {
            console.log(action);
            state.currentBoard = action.payload
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getBoards.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getBoards.fulfilled, (state, action) => {
            state.isLoading = false
            state.boards = action.payload
            state.currentBoard = action.payload.boards[0]
            console.log(state.currentBoard);
        })
        .addCase(getBoards.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const {setCurrentBoard} = boardSlice.actions

export default boardSlice.reducer