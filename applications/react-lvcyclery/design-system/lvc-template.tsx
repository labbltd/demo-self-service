import { DemoBootstrap } from "@labb/demo-utilities";

export default function LVCTemplate(props: { productName: string, productImage: string, children: JSX.Element | JSX.Element[] }) {
    return <div className="page_zSle1">
        <header className="header_V_Egs flex_zDz_l">
            <div className="topbar container_vN2FM constrain_EGyud">
                <div className="left">Shop Hours: Mon-Sat 9-6, Sunday 9-5</div>
                <div className="right">
                    <a href="https://www.facebook.com/lasvegascyclery" target="_blank">
                        <img height="31" src="https://www.sefiles.net/merchant/1973/images/site/facebook2x.png" width="31"></img>
                    </a>
                    <a href="https://www.instagram.com/lasvegascyclery/?hl=en" target="_blank">
                        <img height="31" src="https://www.sefiles.net/merchant/1973/images/site/instagram2x.png" width="31"></img>
                    </a>
                    <a href="https://www.lasvegascyclery.com/about/contact-us-pg151.htm">
                        <img height="31" src="https://www.sefiles.net/merchant/1973/images/site/location2x.png" width="31"></img>
                    </a>
                </div>
            </div>
        </header>
        <main>
            <header aria-hidden="true" className="productHeader_mouix" data-component="productHeader" role="header">
                <div className="container_vN2FM constrain_EGyud">
                    <div className="grid_ghPKb clearfix_hhLma">
                        <div className="cell_uuvmm size12_bNMEu">
                            <div className="productContainer_JRMdX">
                                <span data-component="tracker">
                                    <img alt="" className="productImage_hlZsO marginBottom2_EeogK marginRight2_SgGBZ" role="presentation" src={props.productImage} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <article className="article_KyUpW">
                {props.children}
            </article>
        </main>
        <footer className="footer_Uk6Iu paddingVertical3_G45vB paddingBottom3_fOs8E paddingTop3_qKvcT">
            <div className="container_vN2FM constrain_EGyud">
                <div className="grid_ghPKb clearfix_hhLma">
                    <div className="cell_uuvmm size12_bNMEu sizeLarge10_ZvGra offsetLarge1_byBHQ">
                        <p className="text_Dy8tL fontSize2_QsxkM">
                            © labb Ltd&nbsp;2025<br />
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
}