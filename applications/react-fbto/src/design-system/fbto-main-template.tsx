// components/MainTemplate.jsx
import Header from './fbto-header';
import Footer from './fbto-footer';
import React from 'react';

interface MainTemplateProps {
    children: React.ReactNode;
}

export default function MainTemplate({ children }: MainTemplateProps) {
    return (
        <>
            <Header />
            <main className="container layout-has-sidebar">
                <div className="row">
                    <div className="col-xs-12 col-lg-2">
                        <aside className="sidebar">
                            <div className="sidebar__navigation" style={{ transform: 'translateY(70.7422px)' }}>
                                <button className="sidebar__navigation__trigger">
                                    Direct naar...<i className="icon icon-rf-chevron-down">
                                        <span className="sr-only">Uitklappen subnavigatie</span>
                                    </i>
                                </button>
                                <ul className="sidebar__navigation__list">
                                    <li className="sidebar__navigation__listitem ">
                                        <a href="/zorgverzekering">Zorgverzekering</a>
                                    </li>
                                    <li className="sidebar__navigation__listitem ">
                                        <a href="/zorgverzekering/aanvullend-verzekeren">Aanvullende modules</a>
                                    </li>
                                    <li className="sidebar__navigation__listitem ">
                                        <a href="/zorgverzekering/zorgtools">Zorgtools</a>
                                    </li>
                                    <li className="sidebar__navigation__listitem ">
                                        <a href="/zorgverzekering/blijmakers">Blijmakers</a>
                                    </li>
                                    <li className="sidebar__navigation__listitem ">
                                        <a href="/zorgverzekering/vergoeding">Vergoedingen zoeken</a>
                                    </li>
                                    <li className="sidebar__navigation__listitem ">
                                        <a href="/zorgverzekering/service/zorgverlener-zoeken">Zorgverlener zoeken</a>
                                    </li>
                                    <li className="sidebar__navigation__listitem ">
                                        <a href="/zorgverzekering/declaratie">Zorgnota declareren</a>
                                    </li>
                                    <li className="sidebar__navigation__listitem ">
                                        <a href="/zorgverzekering/service/betalen">Betalen</a>
                                    </li>
                                    <li className="sidebar__navigation__listitem ">
                                        <a href="/zorgverzekering/basisverzekering/eigen-risico">Eigen risico</a>
                                    </li>
                                    <li className="sidebar__navigation__listitem ">
                                        <a href="/zorgverzekering/service">Direct regelen &amp; Contact</a>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                    <div className="col-xs-12 col-lg-10">
                        <section className="strip-section strip-section--pageheader container "></section>
                        <section className="strip-section container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-10 col-sm-offset-1">
                                    <div className="rich-content-block">
                                        <div className="cms-content-wrapper">
                                            {children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
