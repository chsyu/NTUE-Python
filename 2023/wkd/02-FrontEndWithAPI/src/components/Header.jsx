function Header() {
   return (
      <header className="header">
        <div className="container d-flex flex-column align-items-center">
          <img src="images/project.png" alt="" className="header__image" />
          <h1 className="header__title">
            專題瀏覽‘<strong>s</strong> 網頁
          </h1>
          <hr className="divider--light" />
          <p className="header__slogan">NTUE / NTUT</p>
        </div>
      </header>
   );
}

export default Header;