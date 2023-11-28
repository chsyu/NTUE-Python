import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Row, Col } from "antd";
import Nav from "../../components/Nav";
import styles from "./homeWork.module.css";
import notFoundImg from "../../assets/404.png"
import { getHomeWorkById, updateClkCnt } from "../../api";

function HomeWork() {
  const { id } = useParams();

  const [homework, setHomework] = useState(null);
  const getHomeWorkData = async (id) => {
    await updateClkCnt(id);
    const response = await getHomeWorkById(id);
    setHomework(response);
  }

  useEffect(() => {
    getHomeWorkData(id);
  }, []);

  const add404Img = (ev) => {
    ev.target.src = notFoundImg
  }


  return (
    <div>
      <Helmet>
        <title>{
          homework === null ?
            "Loading..." :
            homework.workName
        }'s HomeWork Page</title>
      </Helmet>
      <Nav />
      <div className="container">
        {homework === null ?
          <h1 style={{lineHeight: '100vh', textAlign: 'center'}}>Loading...</h1> :
          <Row gutter={[24, 24]} style={{ justifyContent: 'center', marginTop: '10rem' }}
          >
            <Col xs={{ span: 24 }}
              lg={{ span: 8 }}>
              <img
                onError={add404Img}
                className={styles.img}
                src={homework.imgUrl}
                alt={homework.imgUrl}
              />
            </Col>
            <Col xs={{ span: 24 }}
              lg={{ span: 12 }}>
              <div className={styles.content}>
                <h1 className={styles.title}>題目：{homework.workName}</h1>
                <p>作者：{homework.name.join()}</p>
                <p>技術：{homework.skill.join(", ")}</p>
                <p>點擊次數：{homework.clkCnt}</p>
              </div>
            </Col>
          </Row>
        }
      </div>


    </div>
  );
}

export default HomeWork;
