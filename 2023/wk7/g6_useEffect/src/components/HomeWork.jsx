import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import HomeWorkElement from "./HomeWorkElement";
// import course_data from "../json/course_data.json";
import homework_data from "../json/homework_data.json";
import { getHomeWorks } from "../api";

function HomeWork({ title }) {
  const [homeWorks, setHomeWorks] = useState(homework_data);
  const getHomeWorksData = async () => {
    const response = await getHomeWorks();
    setHomeWorks(response);
  }
  
  useEffect(() => {
    getHomeWorksData();
  }, []);

  return (
    <article className="course py-3 py-sm-5">
      <div className="container">
        <h1 className="text-center">{title}</h1>
        <hr className="divider--dark" />
        <Row gutter={[16, 16]}>
          {Object.keys(homeWorks).map(school => 
            Object.keys(homeWorks[school]).map(semester => homeWorks[school][semester].map(homework => {
            return (
              <Col key={homework.workName + homework.name} sm={{ span: 12 }} lg={{ span: 6 }}>
                <HomeWorkElement
                  school={school}
                  semester={semester}
                  homework_title={homework.workName}
                  homework_img={homework.imgUrl}
                />
              </Col>
            );
          })))}
        </Row>
      </div>
    </article>
  );
}

export default HomeWork;
