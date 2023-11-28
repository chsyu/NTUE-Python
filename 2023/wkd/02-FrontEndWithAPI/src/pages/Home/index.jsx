import Nav from "../../components/Nav";
import Header from "../../components/Header";
import HomeWorkList from "../../components/HomeWorkList";
import Resume from "../../components/Resume";
import Footer from "../../components/Footer";


function Home({ homeWorks }) {

  return (
    <div>
      <Nav />
      <Header />
      {homeWorks === null ?
        <h1 style={{ lineHeight: '100vh', textAlign: 'center' }}>Loading...</h1> :

        <HomeWorkList homeWorks={homeWorks} title="全部專題" />
      }
      <Resume />
      <Footer />
    </div>
  );
}

export default Home;
