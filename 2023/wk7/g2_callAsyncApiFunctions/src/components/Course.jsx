import { Row, Col } from "antd";
import CourseElement from "./CouseElement";
import course_data from "../json/course_data.json";
import { getHomeWorks } from "../api";

function Course({ title }) {

  const getHomeWorksData = async () => {
    const response = await getHomeWorks();
    console.log('response in Course', response);
  }

  getHomeWorksData();

  return (
    <article className="course py-3 py-sm-5">
      <div className="container">
        <h1 className="text-center">{title}</h1>
        <hr className="divider--dark" />
        <Row gutter={[16, 16]}>
          {course_data.map((course) => {
            return (
              <Col key={course.id} sm={{ span: 12 }} lg={{ span: 6 }}>
                <CourseElement
                  course_title={course.course_title}
                  course_img={course.course_img}
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
