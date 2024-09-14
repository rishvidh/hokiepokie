import StudentInputPage from "./pages/StudentInputPage"
import HomePage from "./pages/HomePage"
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/StudentInputPage" element={<StudentInputPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
