import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Institution from "./components/Institution/InstHome";
import CourseHome from "./components/course/CourseHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inst" element={<Institution/>}/>
        <Route path="/course" element={<CourseHome/>}/>
      </Routes>
    </Router>
  );
}

export default App;
