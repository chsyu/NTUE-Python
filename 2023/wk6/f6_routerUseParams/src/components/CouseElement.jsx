import { Link } from "react-router-dom";

function CourseElement({ course_title, course_img } )  {
   return (
     <div className="mt-4">
       <h2 style={style.title_style}>{course_title}</h2>
       <Link to={`courses/${course_title}`} className="course__link">
         <img src={course_img} alt="" className="course__image" />
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

export default CourseElement;