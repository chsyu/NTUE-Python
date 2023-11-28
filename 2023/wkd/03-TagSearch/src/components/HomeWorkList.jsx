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
          {homeWorks.map(homework => {
            return (
              <Col key={homework.id} xs={24} sm={12} lg={6}>
                <HomeWorkElement
                  school={homework.school}
                  semester={homework.semester}
                  homework_title={homework.workName}
                  homework_img={homework.imgUrl}
                  homework_id={homework.id}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </article>
  );
}

export default HomeWork;
