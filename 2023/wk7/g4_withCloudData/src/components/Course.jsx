import { Row, Col } from "antd";
import { useState } from "react";
import CourseElement from "./CouseElement";
import course_data from "../json/course_data.json";
import homework_data from "../json/homework_data.json";
import { getHomeWorks } from "../api";

function Course({ title }) {

   const [homeworks, setHomeworks] = useState(homework_data);
   const getHomeworks = async () => {
      const data = await getHomeWorks();
      setHomeworks(data);
   }
   getHomeworks();

  return (
    <article className="course py-3 py-sm-5">
      <div className="container">
        <h1 className="text-center">{title}</h1>
        <hr className="divider--dark" />
        <Row gutter={[16, 16]}>
          {homework_data.ntue["111-2"].map((course) => {
            return (
              <Col key={course.workName} sm={{ span: 12 }} lg={{ span: 6 }}>
                <CourseElement
                  course_title={course.workName}
                  course_img={course.imgUrl}
                  course_authors={course.name}
                />
              </Col>
            );
          })}
          {homework_data.ntut["111-2"].map((course) => {
            return (
              <Col key={course.workName} sm={{ span: 12 }} lg={{ span: 6 }}>
                <CourseElement
                  course_title={course.workName}
                  course_img={course.imgUrl}
                  course_authors={course.name}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </article>
  );
}

export default Course;
