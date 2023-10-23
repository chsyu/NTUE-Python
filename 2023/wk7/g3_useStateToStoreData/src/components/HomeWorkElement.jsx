import { Link } from "react-router-dom";
import notFoundImg from "../assets/404.png"

function HomeWorkElement({ homework_title, homework_img } )  {
   return (
     <div className="mt-4">
       <h2 style={style.title_style}>{homework_title}</h2>
       <Link to={`courses/${homework_title}`} className="course__link">
         <img src={homework_img} alt={homework_img} className="course__image" />
       </Link>
     </div>
   );
}

const style = {
  title_style: {
    textAlign: "center",
    color: "gray",
    fontSize: "1.4rem",
    fontWeight: 300,
  },
};

export default HomeWorkElement;