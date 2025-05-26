// components/Header.jsx
export default function Header() {
  return (
    <header className="site-header js-sticky">
      <div className="main-nav">
        <button className="main-nav__trigger" aria-expanded="false">
          <span className="main-nav__trigger__icon">
            <span className="menu-line"></span>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </span>
          <span className="main-nav__trigger__text">Menu</span>
        </button>
        <nav aria-label="Hoofdmenu">
          <h2 className="main-nav__payoff">Jij kiest.</h2>
          {/* Add dynamic menu items here */}
        </nav>
      </div>
      <a className="site-header__logo" href="/">
        <img src="assets/images/logo/FBTO-logo-liggend-2019.svg" alt="FBTO.NL" />
      </a>
      <div className="secondary-nav">
        <ul className="personalised-nav">

          <li className="secondary-nav__item ">
            <a href="/verzekeringen" className="secondary-nav__link">Alle verzekeringen</a>
          </li>
          <li className="secondary-nav__item ">
            <a href="/verzekeringen/service" className="secondary-nav__link">Direct regelen</a>
          </li>

        </ul>
        <ul className="service-nav">

          <li className="secondary-nav__item">
            <button type="button" className="secondary-nav__link js-secondary-nav__link--accountmenu" aria-label="Inloggen" aria-expanded="false">
              <i className="icon icon-rf-profile" aria-hidden="true"></i><span className="show-on-desktop">Inloggen</span>
            </button>
            <div className="account-menu-dropdown">
              <ul>
                <li className="account-menu-dropdown__listitem">
                  <a href="https://mijn.fbto.nl/" title="Mijn Productoverzicht">
                    <span className="account-menu-dropdown__listitem__icon">
                      <i className="icon icon-rf-profile" aria-hidden="true"></i>
                    </span>
                    <div className="account-menu-dropdown__listitem__content">
                      <span className="account-menu-dropdown__listitem__title">Inloggen MijnFBTO</span>
                      <span className="account-menu-dropdown__listitem__subtitle">Regel hier makkelijk en snel je verzekeringen</span>
                    </div>
                  </a>
                </li>
                <li className="account-menu-dropdown__listitem">
                  <a href="https://mijnzorg.fbto.nl/" target="_blank" rel="noopener noreferrer" title="Inloggen Zorggebruik (DigiD)">
                    <span className="account-menu-dropdown__listitem__icon">
                      <i className="icon icon-digid" aria-hidden="true"></i>
                    </span>
                    <div className="account-menu-dropdown__listitem__content">
                      <span className="account-menu-dropdown__listitem__title">Inloggen Zorggebruik</span>
                      <span className="account-menu-dropdown__listitem__subtitle">Bekijk je zorgkosten en je eigen risico</span>
                    </div>
                  </a>
                </li>

              </ul>
            </div>
          </li>
          <li className="secondary-nav__item ">
            <a href="/verzekeringen/service?focus=true" className="secondary-nav__link" aria-label="Zoeken op fbto.nl">
              <i className="icon icon-rf-search" aria-hidden="true"></i>
              <span className="show-on-desktop">Zoeken</span>
            </a>
          </li>

        </ul>
      </div>
    </header>
  );
}
