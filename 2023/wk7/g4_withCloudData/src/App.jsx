import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";


import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Course from "./pages/Course";

function App() {
  return (
    <HelmetProvider context={{}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="resume" element={<Resume />} />
          <Route path="courses/:courseName" element={<Course />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
