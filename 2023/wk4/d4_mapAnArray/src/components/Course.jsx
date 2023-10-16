import CourseElement from "./CouseElement";
import course_data from "../json/course_data.json";

function Course({ title }) {

   return (
     <article className="course py-3 py-sm-5">
       <div className="container">
         <h1 className="text-center">{title}</h1>
         <hr className="divider--dark" />
         <div className="row">
            {course_data.map((course) => {
               return (
                  <CourseElement
                     key={course.id}
                     course_title={course.course_title}
                     course_img={course.course_img}   
                  />
               )
            })}
         </div>
       </div>
     </article>
   );
}

export default Course;