import CourseElement from "./CouseElement";
import course_data from "../json/course_data.json"

function Course({ title }) {

   return (
     <article className="course py-3 py-sm-5">
       <div className="container">
         <h1 className="text-center">{title}</h1>
         <hr className="divider--dark" />
         <div className="row">
           <CourseElement course_title="F2E" course_img="images/f2e.jpg" />
           <CourseElement course_title="Arduino" course_img="images/iot.jpg" />
           <CourseElement course_title="APP" course_img="images/app.jpg" />
           <CourseElement course_title="JS" course_img="images/js.jpg" />
         </div>
       </div>
     </article>
   );
}

export default Course;