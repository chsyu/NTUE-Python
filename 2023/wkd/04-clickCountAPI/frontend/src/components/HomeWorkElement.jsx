import { Link } from "react-router-dom";
import notFoundImg from "../assets/404.png"

function HomeWorkElement({
  school,
  semester,
  homework_id,
  homework_title,
  homework_img
}) {

  const add404Img = (ev) => {
    ev.target.src = notFoundImg
  }

  return (
    <div className="mt-4">
      <h2 className="course__title">{homework_title}</h2>
      <p style={style.semester}>{school}:{semester}</p>
      <Link to={`/homeworks/id/${homework_id}`} className="course__link">
        <img
          onError={add404Img}
          src={homework_img} 
          alt={homework_img} 
          className="course__image" 
        />
      </Link>
    </div>
  );
}

const style = {
  semester: {
    textAlign: "center",
    color: "gray",
    fontSize: "1rem",
    fontWeight: 300,
  },
};

export default HomeWorkElement;