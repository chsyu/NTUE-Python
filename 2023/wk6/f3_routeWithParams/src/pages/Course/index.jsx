import { useParams } from "react-router-dom";

import Nav from "../../components/Nav";
import styles from "./course.module.css";

function Course() {
  const { courseName } = useParams();
  return (
    <>
      <Nav />
      <h1 className={styles.container}>{courseName}'s Course Page</h1>
    </>
  );
}

export default Course;
