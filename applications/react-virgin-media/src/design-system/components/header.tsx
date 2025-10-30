import headerLogolg from '../assets/onecms-critical/img/header-vm-logo.lg.png';
import headerLogoSm from '../assets/onecms-critical/img/header-vm-logo.sm.png';
import userIcn from '../assets/onecms-critical/img/mobile-header-images/user_icn.svg';
import businessIcn from '../assets/onecms-critical/img/mobile-header-images/business_icn.svg';
import whiteChevronDownIcn from '../assets/onecms-critical/img/mobile-header-images/white_chevron_down_icn.svg';

export default function VmHeader() {
    return <header style={{ height: 'auto' }}>
        <div id="unified-header" data-unique-id="0">
            <div className="unified-header-content unified-header-new">
                <div className="container-fluid ">
                    <div className="unified-header-logo">
                        <a href="/" tabIndex={1}>
                            <picture>
                                <source media="(min-width: 992px)" srcSet={headerLogolg}></source>
                                <img src={headerLogoSm} alt="Virgin Media" />
                            </picture>
                        </a>
                    </div>
                    <div className="unified-header-nav">
                        <div className="unified-header-level-one clearfix">
                            <div className="unified-header-utilities">
                                <ul className="unified-header-utilities-side">
                                    <li className="unified-header-utilities-item hidden-xs hidden-sm">
                                        <a href="https://my.virginmedia.com/my-apps/email/mailbox">Email
                                        </a>
                                    </li>
                                    <li className="unified-header-utilities-item signin-link  ">
                                        <a href="#" className="visible-xs-block visible-sm-block">
                                            <img src={userIcn} />
                                        </a>

                                        <a href="#" className="hidden-xs hidden-sm ">Sign in</a>
                                        <div className="signin-link-content">
                                            <div className="signin-link-sublinks-subsection">
                                                <span className="header-subtitle">
                                                    My Virgin Media
                                                </span>
                                                <ul>
                                                    <li>
                                                        <a href="/my-virgin-media">Sign in
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="signin-link-sublinks-subsection">
                                                <span className="header-subtitle">
                                                    Virgin Mobile Account
                                                </span>
                                                <ul>
                                                    <li>
                                                        <a href="https://mobile.virginmedia.com/ecare/login">Sign in
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="unified-header-utilities-item visible-xs-block visible-sm-block">
                                        <a href="#" className="unified-header-menu-toggle">
                                            <i className="menu-icon hidden-lg hamburger-menu"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="unified-header-sign-in hidden-lg hidden-md clearfix">

                                <div className="signin-link-sublinks-subsection">
                                    <span className="header-subtitle">
                                        My Virgin Media
                                    </span>
                                    <ul>
                                        <li>
                                            <a href="/my-virgin-media">Sign in
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="signin-link-sublinks-subsection">
                                    <span className="header-subtitle">
                                        Virgin Mobile Account
                                    </span>
                                    <ul>
                                        <li>
                                            <a href="https://mobile.virginmedia.com/ecare/login">Sign in
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                            <div className="unified-header-menu">

                                <ul className="col-xs-12 visible-lg-block visible-md-block">
                                    <li className="col-xs-6 unified-header-menu-item">
                                        <a href="https://my.virginmedia.com/" tabIndex={2}>My Virgin Media
                                        </a>
                                    </li>

                                    <li className="col-xs-6 unified-header-menu-item">
                                        <a href="/broadband/network-expansion" tabIndex={3}>Expanding our network
                                        </a>
                                    </li>

                                    <li className="col-xs-6 unified-header-menu-item">
                                        <a href="/help" tabIndex={4}>Help
                                        </a>
                                    </li>

                                    <li className="col-xs-6 unified-header-menu-item">
                                        <a href="https://www.virginmediabusiness.co.uk/small-business/?CMP=ext_b2c_chmp_hp_tp" tabIndex={5}>Visit our business site
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="unified-header-level-two">
                            <div className="unified-header-main-menu clearfix" style={{ display: 'none', height: '777px' }}>
                                <ul className="sub-label no-sub-label" style={{ maxHeight: '778px' }}>
                                    <li className="col-md-6 col-sm-12 unified-header-main-menu-item">
                                        <a href="/broadband" className="menu-link-item hidden-xs hidden-sm">
                                            <span>Broadband Deals</span>
                                            <span></span>
                                        </a>
                                        <a href="#" className="hidden-lg hidden-md unified-header-menu-2-level-toggle ">
                                            <span className="unified-header--main-menu-item-label">Broadband Deals</span>
                                            <i className="chevron-down hidden-lg"></i>
                                        </a>
                                        <div className="level-two-sublinks-dropdown has-sublinks">
                                            <div className="level-two-sublinks-dropdown-subsection">


                                                <div className="sublinks-subsection clearfix">
                                                    <span className="header-subtitle">
                                                        Shop Broadband, TV and Landline Offers
                                                    </span>
                                                    <i className="chevron-down hidden-lg hidden-md"></i>
                                                    <ul>
                                                        <li>
                                                            <a href="/broadband">
                                                                Broadband Deals


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="/broadband/broadband-only">
                                                                Broadband Only Deals


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="/broadband/broadband-and-phone">
                                                                Broadband &amp; Phone Deals


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="/broadband/broadband-and-tv">
                                                                Broadband &amp; TV Deals


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="/broadband/packages">
                                                                Broadband, TV &amp; Phone Deals


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="/broadband/student">
                                                                Student Broadband Deals


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="/broadband/fibre">
                                                                Fibre Broadband Deals


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="/broadband/speed-test">
                                                                Broadband Speed Test


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="/broadband/postcode-checker">
                                                                Broadband Postcode Checker


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="https://www.virginmediabusiness.co.uk/connectivity/internet-access/business-broadband/?CMP=ext_b2c_chal_BB">
                                                                Business Broadband


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="/tv">
                                                                TV Packages


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="/landline">
                                                                Landline Deals


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="/broadband/compare-deals">
                                                                Compare all broadband deals


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="/broadband/broadband-and-sim">
                                                                Broadband &amp; SIM Deals


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="/broadband/low-income-families">
                                                                Broadband for Low Income Families


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="https://virginmedia.aklamio.com/?source=broadband_home">
                                                                Refer a Friend


                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                    </li>

                                    <li className="col-md-6 col-sm-12 unified-header-main-menu-item">
                                        <a href="/mobile" className="menu-link-item hidden-xs hidden-sm">
                                            <span>Mobile Deals</span>
                                            <span></span>
                                        </a>
                                        <a href="#" className="hidden-lg hidden-md unified-header-menu-2-level-toggle ">
                                            <span className="unified-header--main-menu-item-label">Mobile Deals</span>
                                            <i className="chevron-down hidden-lg"></i>
                                        </a>
                                        <div className="level-two-sublinks-dropdown has-sublinks">
                                            <div className="level-two-sublinks-dropdown-subsection">


                                                <div className="sublinks-subsection clearfix">
                                                    <span className="header-subtitle">
                                                        Shop Mobile Plans
                                                    </span>
                                                    <i className="chevron-down hidden-lg hidden-md"></i>
                                                    <ul>
                                                        <li>
                                                            <a href="/mobile">
                                                                Virgin Mobile


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="/mobile/pay-monthly">
                                                                Pay Monthly Phones


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="/mobile/sim-only">
                                                                Pay Monthly SIMs


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="/mobile/upgrade">
                                                                Upgrade


                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="sublinks-subsection clearfix">
                                                    <span className="header-subtitle">
                                                        Shop O2 Plans
                                                    </span>
                                                    <i className="chevron-down hidden-lg hidden-md"></i>
                                                    <ul>
                                                        <li>
                                                            <a href="https://www.o2.co.uk/shop/phones?cm_mmc=vmreferral-_-nav">
                                                                Phones


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="https://www.o2.co.uk/shop/sim-cards/sim-only-deals?cm_mmc=vmreferral-_-nav">
                                                                SIM Only Deals


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="https://www.o2.co.uk/shop/sim-cards/pay-as-you-go?cm_mmc=vmreferral-_-nav">
                                                                Pay As You Go SIMs


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="https://www.o2.co.uk/shop/tablets?cm_mmc=vmreferral-_-nav">
                                                                Tablets


                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="sublinks-subsection clearfix">
                                                    <span className="header-subtitle">
                                                        Shop Apple on O2
                                                    </span>
                                                    <i className="chevron-down hidden-lg hidden-md"></i>
                                                    <ul>
                                                        <li>
                                                            <a href="https://www.o2.co.uk/iphone?cm_mmc=vmreferral-_-nav">
                                                                Apple iPhone


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="https://www.o2.co.uk/ipad?cm_mmc=vmreferral-_-nav">
                                                                Apple iPad


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="https://www.o2.co.uk/apple-watch?cm_mmc=vmreferral-_-nav">
                                                                Apple Watch


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="https://www.o2.co.uk/airpods?cm_mmc=vmreferral-_-nav">
                                                                Apple AirPods


                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="sublinks-subsection clearfix">
                                                    <span className="header-subtitle">
                                                        Shop Brands on O2
                                                    </span>
                                                    <i className="chevron-down hidden-lg hidden-md"></i>
                                                    <ul>
                                                        <li>
                                                            <a href="https://www.o2.co.uk/shop/brand/samsung?cm_mmc=vmreferral-_-nav">
                                                                Samsung Galaxy


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="https://www.o2.co.uk/shop/brand/google?cm_mmc=vmreferral-_-nav">
                                                                Google Pixel


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="https://www.o2.co.uk/shop/brand/sony?cm_mmc=vmreferral-_-nav">
                                                                Sony Xperia


                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="https://www.o2.co.uk/shop/brand/oppo?cm_mmc=vmreferral-_-nav">
                                                                OPPO Phones


                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                    </li>

                                    <li className="col-md-6 col-sm-12 unified-header-main-menu-item">
                                        <a href="/virgin-tv-edit" className="menu-link-item hidden-xs hidden-sm">
                                            <span>What to Watch</span>
                                            <span></span>
                                        </a>
                                        <a href="#" className="hidden-lg hidden-md unified-header-menu-2-level-toggle ">
                                            <span className="unified-header--main-menu-item-label">What to Watch</span>
                                            <i className="chevron-down hidden-lg"></i>
                                        </a>

                                    </li>

                                    <li className="col-md-6 col-sm-12 unified-header-main-menu-item">
                                        <a href="/blog" className="menu-link-item hidden-xs hidden-sm">
                                            <span>Blog</span>
                                            <span></span>
                                        </a>
                                        <a href="#" className="hidden-lg hidden-md unified-header-menu-2-level-toggle ">
                                            <span className="unified-header--main-menu-item-label">Blog</span>
                                            <i className="chevron-down hidden-lg"></i>
                                        </a>

                                    </li>

                                    <li className="col-md-6 col-sm-12 unified-header-main-menu-item">
                                        <a href="/help" className="menu-link-item hidden-md hidden-lg">
                                            <span>Help &amp; Support</span>
                                            <span></span>
                                        </a>
                                        <a href="#" className="hidden ">
                                            <span className="unified-header--main-menu-item-label">Help &amp; Support</span>
                                            <i className="chevron-down hidden-lg"></i>
                                        </a>

                                    </li>
                                </ul>





                                <div className="unified-header-menu-mobile">

                                    <ul className="col-xs-12 visible-xs-block visible-sm-block utility-links-mobile">
                                        <li className=" col-xs-6 unified-header-menu-item">
                                            <a href="https://my.virginmedia.com/">
                                                <img src={userIcn} className="img-mobile-footer" />
                                                My Virgin Media
                                            </a>
                                        </li>

                                        <li className=" col-xs-6 unified-header-menu-item">
                                            <a href="/broadband/network-expansion">
                                                <img src={userIcn} className="img-mobile-footer" />
                                                Expanding our network
                                            </a>
                                        </li>

                                        <li className=" col-xs-6 unified-header-menu-item">
                                            <a href="/help">
                                                <img src={whiteChevronDownIcn} className="img-mobile-footer" />
                                                Help
                                            </a>
                                        </li>

                                        <li className=" col-xs-6 unified-header-menu-item">
                                            <a href="https://www.virginmediabusiness.co.uk/small-business/?CMP=ext_b2c_chmp_hp_tp">
                                                <img src={businessIcn} className="img-mobile-footer" />
                                                Visit our business site
                                            </a>
                                        </li>

                                        <li className=" col-xs-6 unified-header-menu-item">
                                            <a href="https://my.virginmedia.com/my-apps/email/mailbox">
                                                <img src={userIcn} className="img-mobile-footer" />
                                                Email
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="overlay hidden"></div>
    </header>
}