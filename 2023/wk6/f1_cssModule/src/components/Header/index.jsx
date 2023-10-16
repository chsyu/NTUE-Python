function Header() {
   return (
      <header className="header">
        <div className="container d-flex flex-column align-items-center">
          <img src="images/chsyu.jpg" alt="" className="header__image" />
          <h1 className="header__title">
            山‘<strong>s</strong> 網頁
          </h1>
          <hr className="divider--light" />
          <p className="header__slogan">APP／WEB／WOT／UX</p>
        </div>
      </header>
   );
}

export default Header;