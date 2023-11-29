import { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import HomeWorkList from "../../components/HomeWorkList";
import Resume from "../../components/Resume";
import Footer from "../../components/Footer";
import { getHomeWorks } from "../../api";

function Home() {

  const [homeWorks, setHomeWorks] = useState(null);
  const getHomeWorksData = async () => {
    const response = await getHomeWorks();
    setHomeWorks(response);
  }

  useEffect(() => {
    getHomeWorksData();
  }, []);

  return (
    <div>
      <Nav />
      <Header />
      {homeWorks === null ?
        <h1 style={{ lineHeight: '100vh', textAlign: 'center' }}>
          Loading...</h1> :
        <HomeWorkList homeWorks={homeWorks} title="全部專題" />
      }
      <Resume />
      <Footer />
    </div>
  );
}

export default Home;
