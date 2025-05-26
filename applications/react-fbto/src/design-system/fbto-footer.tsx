// components/Footer.jsx
export default function Footer() {
  return (
    <footer>
      <div className="footer__section-wrapper">
        <div className="footer__section">
          <ul className="footer__navigation-list footer__navigation-list--socials">
            <li className="navigation-list__item">
              <a href="https://www.facebook.com/FBTO" target="_blank" rel="noopener noreferrer" aria-label="Facebook FBTO">
                <i className="icon icon-rf-facebook" aria-hidden="true"></i>
              </a>
            </li>
            <li className="navigation-list__item">
              <a href="https://www.instagram.com/fbto_nl/?hl=nl" target="_blank" rel="noopener noreferrer" aria-label="Ga naar het FBTO profiel op Instagram">
                <i className="icon icon-rf-instagram" aria-hidden="true"></i>
              </a>
            </li>
            <li className="navigation-list__item">
              <a href="https://nl.linkedin.com/company/fbto" target="_blank" rel="noopener noreferrer" aria-label="Volg FBTO op LinkedIn">
                <i className="icon icon-rf-linkedin" aria-hidden="true"></i>
              </a>
            </li>
            <li className="navigation-list__item">
              <a href="https://nl.pinterest.com/fbto/" target="_blank" rel="noopener noreferrer" aria-label="Volg FBTO op Pinterest">
                <i className="icon icon-rf-pinterest" aria-hidden="true"></i>
              </a>
            </li>
            <li className="navigation-list__item">
              <a href="https://twitter.com/fbto" target="_blank" rel="noopener noreferrer" aria-label="Volg ons op X">
                <i className="icon icon-rf-twitter" aria-hidden="true"></i>
              </a>
            </li>
            <li className="navigation-list__item">
              <a href="https://www.youtube.com/user/jijkiestFBTO" target="_blank" rel="noopener noreferrer" aria-label="Volg ons op YouTube">
                <i className="icon icon-rf-youtube" aria-hidden="true"></i>
              </a>
            </li>

          </ul>
          <nav aria-label="Footer navigatie">
            <ul className="footer__navigation-list">
              <li className="navigation-list__item">
                <a href="/verzekeringen/contact">Contact</a>
              </li>
              <li className="navigation-list__item">
                <a href="/over-ons">Over ons</a>
              </li>
              <li className="navigation-list__item">
                <a>Cookie-instellingen</a>
              </li>
              <li className="navigation-list__item">
                <a href="/over-ons/privacy">Privacy</a>
              </li>
              <li className="navigation-list__item">
                <a href="/over-ons/veiligheid">Veiligheid</a>
              </li>
              <li className="navigation-list__item">
                <a href="/over-ons/fraude">Fraudebeleid</a>
              </li>
              <li className="navigation-list__item">
                <a href="/over-ons/disclaimer">Disclaimer</a>
              </li>
              <li className="navigation-list__item">
                <a href="#" id="surfly-button" aria-label="Laat een medewerker meekijken">
                  <i className="icon icon-surfly" aria-hidden="true"></i>
                </a>
                <div className="hidden" id="surfly-codebox"></div>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer__section">
          <ul className="footer__navigation-list footer__navigation-list--icons">
            <li className="navigation-list__item">
              <a href="https://www.wijzeringeldzaken.nl/verzekering/" target="_blank" rel="noopener noreferrer" aria-label="Ga naar Wijzer in Geldzaken.nl">
                <i className="icon icon-rf-wijzer" aria-hidden="true"></i>
              </a>
            </li>
            <li className="navigation-list__item">
              <a href="https://www.thuiswinkel.org/leden/fbto/certificaat" target="_blank" rel="noopener noreferrer" aria-label="Ga naar het Thuiswinkelcertificaat van FBTO.nl">
                <i className="icon icon-rf-thuiswinkel" aria-hidden="true"></i>
              </a>
            </li>

          </ul>
          <ul className="footer__navigation-list">
            <li className="navigation-list__item achmea-link"><a href="https://www.achmea.nl" rel="noopener noreferrer" target="_blank" aria-label="FBTO is onderdeel van Achmea" title="Ga naar achmea.nl">FBTO is onderdeel van <i className="icon icon-rf-achmea" aria-hidden="true"></i></a></li>
          </ul>
        </div>
      </div>

    </footer>
  );
}
