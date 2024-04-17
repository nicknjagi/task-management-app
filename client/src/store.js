import {configureStore} from '@reduxjs/toolkit'
import boardReducer from './features/board/boardSlice'
import columnReducer from './features/column/columnSlice'

export const store = configureStore({
    reducer: {
        board:boardReducer,
        column:columnReducer
    }
})