import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import HomeWorkList from "../../components/HomeWorkList";
import Resume from "../../components/Resume";
import Footer from "../../components/Footer";
import { getHomeWorksByFilter } from '../../api';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Search() {
  const [homeWorks, setHomeWorks] = useState(null);
  const { tag } = useParams();
  const query = useQuery();
  const filter = query.get("filter"); 
  const type = query.get("type"); 

  const getHomeWorksData = async () => {
    const response = await getHomeWorksByFilter(filter, type);
    setHomeWorks(response);
  }

  useEffect(() => {
    getHomeWorksData();
  }, [tag]);

  return (
    <div>
      <Nav />
      <Header tag={tag} />
      {homeWorks === null ?
        <h1 style={{ lineHeight: '100vh', textAlign: 'center' }}>
          Loading...</h1> :
        <HomeWorkList homeWorks={homeWorks} title={`${tag}專題`} />
      }
      <Resume />
      <Footer />
    </div>
  );
}

export default Search;
