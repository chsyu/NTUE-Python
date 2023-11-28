import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Resume from "./pages/Resume";
import HomeWork from "./pages/HomeWork";
import ScrollToTop from "./ScrollToTop";

function App() {

  return (
    <HelmetProvider context={{}}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/search/:tag" element={<Search />}/>
          <Route path="resume" element={<Resume />} />
          <Route path="homeworks/id/:id" element={<HomeWork />}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
