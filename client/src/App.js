import { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { history } from './_helpers/history';
import Tasks from './components/Tasks'
import Layout from './layouts/Layout'
import { getBoards } from './features/board/boardSlice'

function App() {
  const dispatch = useDispatch()

  history.navigate = useNavigate();
  history.location = useLocation();

  useEffect(()=>{
    dispatch(getBoards())
  },[dispatch])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Tasks />}/>
      </Route>
    </Routes>
  )
}

export default App
