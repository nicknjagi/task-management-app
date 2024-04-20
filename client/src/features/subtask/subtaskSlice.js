import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    subtasks:[]
}

export const subtaskSlice = createSlice({
    name:'subtask',
    initialState,
    reducers:{}
})

export default subtaskSlice.reducer