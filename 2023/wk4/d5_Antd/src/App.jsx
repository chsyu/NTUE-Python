import Nav from './components/Nav';
import Header from './components/Header';
import Course from './components/Course';
import Resume from './components/Resume';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Nav />
      <Header />
      <Course title = "課程" />
      <Resume />
      <Footer />
    </div>
  );
}

export default App;
