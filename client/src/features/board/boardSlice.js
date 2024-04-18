import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { history } from "../../_helpers/history";

const url = 'http://localhost:5000/api/v1/boards'

const initialState = {
    boards: [],
    isLoading:true,
    currentBoard:null,
    creatingBoard:false,
    updatingBoard:false,
    deletingBoard:false
}

export const getBoards = createAsyncThunk('board/getBoards', async () => {
    try {
        const resp = await axios.get(url)
        return resp.data.boards
    } catch (error) {
        console.log(error);
    }
})

export const createBoard = createAsyncThunk('boards/createBoard', async (board, thunkAPI) => {
    try {
        const resp = await axios.post(url, board)
        return resp.data.board
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const updateBoard = createAsyncThunk('boards/updateBoard', async (boardId) => {
    try {
        const resp = await axios.patch(`${url}/${boardId}`)
        console.log(resp);
        return resp.data
    } catch (error) {
        console.log(error);
    }
})

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (boardId, thunkAPI) => {
    try {
        const resp = await axios.delete(`${url}/${boardId}`)
        return resp.request.responseURL
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const boardSlice = createSlice({
    name:'board',
    initialState,
    reducers: {
        setCurrentBoard: (state, action) => {
            console.log(action.payload);
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
            state.currentBoard = action.payload[0]
        })
        .addCase(getBoards.rejected, (state) => {
            state.isLoading = false
        })
        .addCase(createBoard.pending, (state) => {
            state.creatingBoard = true
        })
        .addCase(createBoard.fulfilled, (state, action) => {
            state.creatingBoard = false
            state.currentBoard = action.payload
            state.boards = [...state.boards, action.payload]
            toast.success('Board created!');
            history.navigate('/')
        })
        .addCase(createBoard.rejected, (state, action) => {
            state.creatingBoard = false
            state.currentBoard = state.boards[0]
            toast.error(action.payload)
        })
        .addCase(updateBoard.pending, (state) => {
            state.updatingBoard = true
        })
        .addCase(updateBoard.fulfilled, (state, action) => {
            state.updatingBoard = false
            const id = Number(action.payload.split('/').pop())
            state.boards = state.boards.filter(board => board.id !== id)
            state.currentBoard = [...state.boards].pop()
            toast.success('Board updated!');
        })
        .addCase(updateBoard.rejected, (state) => {
            state.updatingBoard = false
        })
        .addCase(deleteBoard.pending, (state) => {
            state.deletingBoard = true
        })
        .addCase(deleteBoard.fulfilled, (state, action) => {
            state.deletingBoard = false
            const id = Number(action.payload.split('/').pop())
            state.boards = state.boards.filter(board => board.id !== id)
            state.currentBoard = [...state.boards].pop()
            toast.success('Board deleted!');
        })
        .addCase(deleteBoard.rejected, (state) => {
            state.deletingBoard = false
        })
    }
})

export const {setCurrentBoard} = boardSlice.actions

export default boardSlice.reducer