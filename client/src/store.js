import {configureStore} from '@reduxjs/toolkit'
import boardReducer from './features/board/boardSlice'
import columnReducer from './features/column/columnSlice'
import taskReducer from './features/task/taskSlice'
import subtaskReducer from './features/subtask/subtaskSlice'

export const store = configureStore({
    reducer: {
        board:boardReducer,
        column:columnReducer,
        task:taskReducer,
        subtask:subtaskReducer
    }
})