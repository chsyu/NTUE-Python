import Nav from "../../components/Nav";
import Header from "../../components/Header";
import HomeWork from "../../components/HomeWork";
import Resume from "../../components/Resume";
import Footer from "../../components/Footer";


function Home() {

  return (
    <div>
      <Nav />
      <Header />
      <HomeWork title="作業" />
      <Resume />
      <Footer />
    </div>
  );
}

export default Home;
