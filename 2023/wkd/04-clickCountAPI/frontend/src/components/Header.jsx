import { Link } from "react-router-dom";

const schools = ["ntue", "ntut"];
const semesters =["110-1", "110-2", "111-1", "111-2", "112-1"]

function Header({tag}) {
  const replaceSemester = (str) => {
    if (str.includes('-1')) {
        str = str.replace('-1', '期中');
    }
    if (str.includes('-2')) {
        str = str.replace('-2', '期末');
    }
    return str;
} 
   return (
      <header className="header">
        <div className="container d-flex flex-column align-items-center">
          <img src="/images/project.png" alt="" className="header__image" />
          <h1 className="header__title">
            專題瀏覽‘<strong>s</strong> 網頁
          </h1>
          <hr className="divider--light" />
          <p className="header__slogan">NTUE / NTUT</p>
        </div>
        <div className="tag">
            {schools.map((tag, index) => (
              <Link
                key={index}
                className="tag__link"
                to={`/search/${tag}?filter=${tag}&type=school`}
              >
                {tag}
              </Link>
            ))}
            {semesters.map((tag, index) => (
              <Link
                key={index}
                className="tag__link"
                to={`/search/${replaceSemester(tag)}?filter=${tag}&type=semester`}
              >
                {replaceSemester(tag)}
              </Link>
            ))}
         </div>
      </header>
   );
}

export default Header;