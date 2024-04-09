import { Routes, Route } from 'react-router-dom'
import Layout from '../layouts/Layout'
import Tasks from './Tasks'
import CreateBoard from '../pages/CreateBoard'
import AddTask from '../pages/AddTask'
import TaskDetail from '../pages/TaskDetail'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Tasks />}/>
        <Route path='/create' element={<CreateBoard />}/>
        <Route path='/add' element={<AddTask />}/>
        <Route path='/:id' element={<TaskDetail />}/>
      </Route>
    </Routes>
  )
}

export default App
