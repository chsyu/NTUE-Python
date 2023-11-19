import Nav from "../../components/Nav";
import Header from "../../components/Header";
import HomeWorkList from "../../components/HomeWorkList";
import Resume from "../../components/Resume";
import Footer from "../../components/Footer";


function Home({ homeWorks}) {

  return (
    <div>
      <Nav />
      <Header />
      <HomeWorkList homeWorks={homeWorks} title="作業" />
      <Resume />
      <Footer />
    </div>
  );
}

export default Home;
