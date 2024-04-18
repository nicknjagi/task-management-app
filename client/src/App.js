import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { history } from './_helpers/history';
import Tasks from './components/Tasks'
import Layout from './layouts/Layout'
import AddTask from './routes/AddTask'
import CreateBoard from './routes/CreateBoard'
import TaskDetail from './routes/TaskDetail'
import { getBoards } from './features/board/boardSlice'
import { getColumns } from './features/column/columnSlice'
import UpdateBoard from './routes/UpdateBoard';

function App() {
  const {currentBoard} = useSelector(state => state.board)
  const dispatch = useDispatch()

  history.navigate = useNavigate();
  history.location = useLocation();

  useEffect(()=>{
    dispatch(getBoards())
    dispatch(getColumns(currentBoard?.id))
  },[])

  useEffect(()=>{
    dispatch(getColumns(currentBoard?.id))
  },[currentBoard])
  
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Tasks />}/>
      </Route>
    </Routes>
  )
}

export default App
