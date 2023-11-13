import { Row, Col } from "antd";
import HomeWorkElement from "./HomeWorkElement";
// import course_data from "../json/course_data.json";
function HomeWork({ title, homeWorks }) {

  return (
    <article className="course py-3 py-sm-5">
      <div className="container">
        <h1 className="text-center">{title}</h1>
        <hr className="divider--dark" />
        <Row gutter={[24, 24]}>
          {Object.keys(homeWorks).map(school => 
            Object.keys(homeWorks[school]).map(semester => homeWorks[school][semester].map(homework => {
            return (
              <Col key={homework.workName + homework.name} xs={24} sm={12} lg={6}>
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
