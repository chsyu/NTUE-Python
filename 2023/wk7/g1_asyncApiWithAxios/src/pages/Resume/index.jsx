import { Helmet } from "react-helmet-async";

import Nav from "../../components/Nav";
import styles from "./resume.module.css";

function Resume() {
  return (
    <>
      <Helmet>
        <title>Resume Page</title>
      </Helmet>
      <Nav />
      <h1 className={styles.container}>Resume Page</h1>
    </>
  );
}

export default Resume;
