import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ClassList from './components/classes/ClassList';
import ClassDetail from './components/classes/ClassDetail';
import LectureDetail from './components/lectures/LectureDetails';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/classes" element={<ClassList />} />
      <Route path="/classes/:id" element={<ClassDetail />} />
      <Route path="/classes/:classId/units/:unitId/sessions/:sessionId/lectures/:lectureId" element={<LectureDetail />} />
    </Routes>
  </Router>
  );
}

export default App;
