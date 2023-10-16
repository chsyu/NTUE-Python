import CourseElement from "./CouseElement";
import course_data from "../json/course_data.json";

function Course({ title }) {

   return (
     <article className="course py-3 py-sm-5">
       <div className="container">
         <h1 className="text-center">{title}</h1>
         <hr className="divider--dark" />
         <div className="row">
           <CourseElement
             course_title={course_data[0].course_title}
             course_img={course_data[0].course_img}
           />
           <CourseElement
             course_title={course_data[1].course_title}
             course_img={course_data[1].course_img}
           />
           <CourseElement
             course_title={course_data[2].course_title}
             course_img={course_data[2].course_img}
           />
           <CourseElement
             course_title={course_data[3].course_title}
             course_img={course_data[3].course_img}
           />
         </div>
       </div>
     </article>
   );
}

export default Course;