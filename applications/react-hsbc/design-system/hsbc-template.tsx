import { DemoBootstrap } from "@labb/demo-utilities";

export default function HsbcTemplate(props: { productName: string, productImage: string, children: JSX.Element | JSX.Element[] }) {
    return <div className="page_zSle1">
        <header className="header_V_Egs flex_zDz_l">
            <div className="container_cYEVS">
                <div className="container_vN2FM constrain_EGyud">
                    <div className="grid_ghPKb clearfix_hhLma">
                        <div className="cell_uuvmm size12_bNMEu"><div>
                            <span className="logo_L856C" title="HSBC logo" role="img">
                                {DemoBootstrap.getLabbLogo() && <img src={DemoBootstrap.getLabbLogo()} />}
                                {!DemoBootstrap.getLabbLogo() && <svg focusable="false" id="logo-hsbc" role="img" viewBox="0 0 285 38">
                                    <title>HSBC - The Hongkong and Shanghai Banking Corporation - UK</title>
                                    <polygon fill="#db0011" points="91.87 23 69 0 69 46 91.87 23"></polygon>
                                    <polygon fill="#db0011" points="46 23 69 0 23 0 46 23"></polygon>
                                    <polygon fill="#db0011" points="0 23 23 46 23 0 0 23"></polygon>
                                    <polygon fill="#db0011" points="46 23 23 46 69 46 46 23"></polygon>
                                    <polygon points="112.16 24.42 103.76 24.42 103.76 32.56 99.62 32.56 99.62 13.44 103.76 13.44 103.76 21.32 112.16 21.32 112.16 13.44 116.29 13.44 116.29 32.56 112.16 32.56 112.16 24.42"></polygon>
                                    <path d="M126.24,32.95c-4.13,0-7.62-1.68-7.62-6.2h4.13c0,2.07,1.29,3.23,3.49,3.23,1.68,0,3.62-.9,3.62-2.71,0-1.55-1.29-1.94-3.49-2.58l-1.42-.39c-3-.9-6.07-2.07-6.07-5.56,0-4.26,4-5.69,7.62-5.69s7,1.29,7,5.56h-4.13q-.19-2.71-3.1-2.71c-1.55,0-3.1.78-3.1,2.58,0,1.42,1.29,1.81,4,2.71l1.55.52c3.36,1,5.43,2.2,5.43,5.43.13,4.13-4,5.81-7.88,5.81"></path>
                                    <path d="M136.71,13.44h6.72a12.76,12.76,0,0,1,3.75.26c2.33.52,4.13,2.07,4.13,4.65s-1.55,3.75-3.88,4.39c2.58.52,4.52,1.81,4.52,4.65,0,4.39-4.26,5.43-7.75,5.43h-7.49Zm6.59,8c1.81,0,3.75-.39,3.75-2.58,0-1.94-1.81-2.58-3.49-2.58h-3v5.17Zm.52,8.27c1.94,0,3.88-.52,3.88-2.84S146,24,144.07,24h-3.36v5.56h3.1Z"></path>
                                    <path d="M162.81,32.95c-6.2,0-9-4-9-9.82s3.1-10.08,9.17-10.08c3.88,0,7.62,1.68,7.62,6.07H166.3a3.17,3.17,0,0,0-3.36-3c-3.75,0-4.91,4-4.91,7.11s1.16,6.59,4.78,6.59a3.41,3.41,0,0,0,3.62-3h4.39c-.52,4.39-4,6.07-8,6.07"></path>
                                    <path d="M185.81,32.95c-4.78,0-7.37-2.71-7.37-7.37V13.44h1.81v11.5a6.92,6.92,0,0,0,.9,4.26,5.95,5.95,0,0,0,9.69-.65,8.5,8.5,0,0,0,.52-3.62V13.44h1.81V25.58c0,4.52-2.71,7.37-7.37,7.37"></path>
                                    <path d="M197.05,13.44h1.68V32.69h-1.68Zm1.81,8.79,8.53-8.79h2.33l-8.79,8.66,9.69,10.6h-2.33Z"></path>
                                </svg>}
                            </span>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <header aria-hidden="true" className="productHeader_mouix" data-component="productHeader" role="header">
                <div className="container_vN2FM constrain_EGyud">
                    <div className="grid_ghPKb clearfix_hhLma">
                        <div className="cell_uuvmm size12_bNMEu sizeLarge6_tmXJ5 offsetLarge1_byBHQ">
                            <div className="productContainer_JRMdX">
                                <span data-component="tracker">
                                    <img alt="" className="productImage_hlZsO marginTop2_JrTKO marginBottom2_EeogK marginRight2_SgGBZ" role="presentation" src={props.productImage} />
                                </span>
                                <section className="header_nLsFi fontLight_SlHz2 fontSize3_hUHe0">Your application
                                    <span className="productTitle_BWkzn fontSize4_LylNw paddingTopHalf_CAyI7" data-testid="productTitle">{props.productName}</span>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <article className="article_KyUpW paddingTop4_y7eDz">
                {props.children}
            </article>
        </main>
        <footer className="footer_Uk6Iu paddingVertical3_G45vB paddingBottom3_fOs8E paddingTop3_qKvcT">
            <div className="container_vN2FM constrain_EGyud">
                <div className="grid_ghPKb clearfix_hhLma">
                    <div className="cell_uuvmm size12_bNMEu sizeLarge10_ZvGra offsetLarge1_byBHQ">
                        <p className="text_Dy8tL fontSize2_QsxkM">
                            © HSBC Group&nbsp;2025<br />
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
}