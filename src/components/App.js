import { Routes, Route } from 'react-router-dom'
import Layout from '../layouts/Layout'
import Tasks from './Tasks'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Tasks />}/>
      </Route>
    </Routes>
  )
}

export default App
