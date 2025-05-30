export default function LVCContainer(props: {
    title?: string,
    instruction?: string,
    children: JSX.Element | JSX.Element[]
}) {
    return <div className="container_vN2FM constrain_EGyud">
        <div className="grid_ghPKb clearfix_hhLma">
            <div className="cell_uuvmm size12_bNMEu sizeMedium9_CXgpP container-margin">
                {props.title && <div className="container_CsI53 marginBottom3_cHPnK" data-component="PageHeader">
                    <div className="grid_ghPKb clearfix_hhLma">
                        <div className="cell_uuvmm size12_bNMEu"><div className="textContainer_kIkGx marginBottom2_EeogK">
                            <h1 className="heading_GSFKs h1_iZ4nN fontLight_SlHz2 fontSize6_EWN8V noMargin_Vq5Wm largerMarginInLargeDevice_M5t6a" tabIndex={-1}>
                                {props.title}
                            </h1>
                            {props.instruction && <p className="p_uRnMP default_WU9Y4 fontRegular_RMvdW fontSize3_hUHe0 marginBottom2_EeogK paragraph_tgeyV paddingTop2_K0a6V" dangerouslySetInnerHTML={{__html: props.instruction}}></p>}
                        </div>
                            <div className="cell_uuvmm size12_bNMEu">
                                <hr aria-hidden="true" className="hr_kXd72" />
                            </div>
                        </div>
                    </div>
                </div>}
                {props.children}
            </div>
        </div>
    </div>
}