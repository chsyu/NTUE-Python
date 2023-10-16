import styles from './footer.module.css';

function Footer() {
   return (
     <footer className={styles.footer}>
       <div className={styles.footer__above}>
         <div className={styles.container}>
           <div className={styles.row}>
             <h5 className={styles.footer__description}>
               臺北市和平東路二段134號，國立臺北教育大學 數位科技設計學系
             </h5>
             <ul className={styles.footer__list}>
               <li className={styles.footer__item}>
                 <a href="" className={styles.footer__link}>
                   <i className={styles.fab}></i>
                 </a>
               </li>
               <li className={styles.footer__item}>
                 <a href="" className={styles.footer__link}>
                   <i className={styles.fab}></i>
                 </a>
               </li>
               <li className={styles.footer__item}>
                 <a href="" className={styles.footer__link}>
                   <i className={styles.fab}></i>
                 </a>
               </li>
             </ul>
           </div>
         </div>
       </div>

       <div className={styles.footer__below}>
         <div className={styles.container}>
           <h6>&copy; Copyright All rights reserved.</h6>
         </div>
       </div>
     </footer>
   );
}

export default Footer;