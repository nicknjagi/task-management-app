import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { history } from "../../_helpers/history";
import { getColumns } from "../column/columnSlice";

const initialState = {
    boards: [],
    isLoading:true,
    currentBoard:null,
    creatingBoard:false,
    updatingBoard:false,
    deletingBoard:false
}

export const getBoards = createAsyncThunk('board/getBoards', async (_, thunkAPI) => {
    try {
        const resp = await axios.get(`${process.env.REACT_APP_URL}/api/v1/boards`)
        thunkAPI.dispatch(getColumns(resp.data.boards[0].id))
        return resp.data.boards
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const createBoard = createAsyncThunk('boards/createBoard', async (board, thunkAPI) => {
    try {
        const resp = await axios.post(`${process.env.REACT_APP_URL}/api/v1/boards`, board)
        return resp.data.board
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const updateBoard = createAsyncThunk('boards/updateBoard', async (board, thunkAPI) => {
    try {
        const id = thunkAPI.getState().board.currentBoard.id;
        const resp = await axios.patch(`${process.env.REACT_APP_URL}/api/v1/boards/${id}`, board)
        return resp.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (boardId, thunkAPI) => {
    try {
        const resp = await axios.delete(`${process.env.REACT_APP_URL}/api/v1/boards/${boardId}`)
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
            state.currentBoard = action.payload
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getBoards.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getBoards.fulfilled, (state, action) => {
            state.isLoading = false
            state.boards = action.payload?.sort((a, b) => {
                return a.id-b.id
            })
            state.currentBoard = action.payload[0]
        })
        .addCase(getBoards.rejected, (state, action) => {
            state.isLoading = false
            toast.error(action.payload || 'something went wrong')
        })
        .addCase(createBoard.pending, (state) => {
            state.creatingBoard = true
        })
        .addCase(createBoard.fulfilled, (state, action) => {
            state.creatingBoard = false
            state.currentBoard = action.payload
            state.boards = [...state.boards, action.payload]
            toast.success('Board created');
            history.navigate('/')
        })
        .addCase(createBoard.rejected, (state, action) => {
            state.creatingBoard = false
            state.currentBoard = state.boards[0]
            toast.error(action.payload || 'something went wrong')
        })
        .addCase(updateBoard.pending, (state) => {
            state.updatingBoard = true
        })
        .addCase(updateBoard.fulfilled, (state, action) => {
            state.updatingBoard = false
            // console.log(action);
            const {board} = action.payload
            const id = Number(board.id)
            state.boards = state.boards.filter(board => board.id !== id)
            state.boards = [...state.boards, board].sort((a, b) => {
                return a.id - b.id
            })
            state.currentBoard = board
            toast.success('Board updated');
        })
        .addCase(updateBoard.rejected, (state, action) => {
            state.updatingBoard = false
            toast.error(action.payload || 'something went wrong')
        })
        .addCase(deleteBoard.pending, (state) => {
            state.deletingBoard = true
        })
        .addCase(deleteBoard.fulfilled, (state, action) => {
            state.deletingBoard = false
            const id = Number(action.payload.split('/').pop())
            state.boards = state.boards.filter(board => board.id !== id)
            state.currentBoard = [...state.boards].pop()
            toast.success('Board deleted');
        })
        .addCase(deleteBoard.rejected, (state) => {
            state.deletingBoard = false
        })
    }
})

export const {setCurrentBoard} = boardSlice.actions

export default boardSlice.reducer