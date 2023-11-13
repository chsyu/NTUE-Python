import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import homework_data from "./json/homework_data.json";
import { getHomeWorks } from "./api";

import Home from "./pages/Home";
import Resume from "./pages/Resume";
import HomeWork from "./pages/HomeWork";
import ScrollToTop from "./ScrollToTop";

function App() {

  const [homeWorks, setHomeWorks] = useState(homework_data);
  const getHomeWorksData = async () => {
    const response = await getHomeWorks();
    setHomeWorks(response);
  }

  useEffect(() => {
    getHomeWorksData();
  }, []);

  return (
    <HelmetProvider context={{}}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home homeWorks={homeWorks} />}/>
          <Route path="resume" element={<Resume />} />
          <Route path="homeworks/:school/:semester/:homeWorkName" element={<HomeWork homeWorks={homeWorks}/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
