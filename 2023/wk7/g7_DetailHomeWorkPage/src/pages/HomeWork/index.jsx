import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Nav from "../../components/Nav";
import styles from "./homeWork.module.css";
import notFoundImg from "../../assets/404.png"

function HomeWork({ homeWorks }) {
  const { homeWorkName, school, semester } = useParams();
  const homework = homeWorks[school][semester].find(homework => homework.workName === homeWorkName);

  const add404Img = (ev) => {
    ev.target.src = notFoundImg
  }


  return (
    <>
      <Helmet>
        <title>{homework.workName}'s HomeWork Page</title>
      </Helmet>
      <Nav />
      <div className={styles.container}>
        <img
          onError={add404Img}
          className={styles.img} 
          src={homework.imgUrl} 
          alt={homework.imgUrl} 
        />
        <div className={styles.content}>
          <h1 className={styles.title}>題目：{homework.workName}</h1>
          <p>作者：{homework.name.join()}</p>
          <p>技術：{homework.skill.join()}</p>

        </div>
      </div>

    </>
  );
}

export default HomeWork;
