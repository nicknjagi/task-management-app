import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Tasks from './components/Tasks'
import Layout from './layouts/Layout'
import AddTask from './routes/AddTask'
import CreateBoard from './routes/CreateBoard'
import TaskDetail from './routes/TaskDetail'
import { getBoards } from './features/board/boardSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getBoards())
  },[])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Tasks />}/>
        <Route path='/board/create' element={<CreateBoard />}/>
        <Route path='/task/add' element={<AddTask />}/>
        <Route path='/task/:id' element={<TaskDetail />}/>
      </Route>
    </Routes>
  )
}

export default App
