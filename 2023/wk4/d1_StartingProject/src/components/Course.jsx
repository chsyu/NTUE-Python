function Course() {
   return (
     <article className="course py-3 py-sm-5">
       <div className="container">
         <h1 className="text-center">課程</h1>
         <hr className="divider--dark" />
         <div className="row">
           <div className="mt-4 col-sm-6 col-lg-3">
             <a href="" className="course__link">
               <img src="images/f2e.jpg" alt="" className="course__image" />
             </a>
           </div>
           <div className="mt-4 col-sm-6 col-lg-3">
             <a href="" className="course__link">
               <img src="images/iot.jpg" alt="" className="course__image" />
             </a>
           </div>
           <div className="mt-4 col-sm-6 col-lg-3">
             <a href="" className="course__link">
               <img src="images/app.jpg" alt="" className="course__image" />
             </a>
           </div>
           <div className="mt-4 col-sm-6 col-lg-3">
             <a href="" className="course__link">
               <img src="images/js.jpg" alt="" className="course__image" />
             </a>
           </div>
         </div>
       </div>
     </article>
   );
}

export default Course;