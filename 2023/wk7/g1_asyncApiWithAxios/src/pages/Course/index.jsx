import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Nav from "../../components/Nav";
import styles from "./course.module.css";

function Course() {
  const { courseName } = useParams();
  return (
    <>
      <Helmet>
        <title>{courseName}'s Course Page</title>
      </Helmet>
      <Nav />
      <h1 className={styles.container}>{courseName}'s Course Page</h1>
    </>
  );
}

export default Course;
