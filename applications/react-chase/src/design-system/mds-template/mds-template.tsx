import MdsAlert from "../mds-alert/mds-alert"
import MdsIcon from "../mds-icon/mds-icon"

export default function MdsTemplate(props: {
    title: string,
    children: JSX.Element | JSX.Element[]
}) {
    return <div className="mds-container-fluid mds-px-at-768-0 containerLock">
        <div className="mds-d-flex mds-fw-wrap page">
            <div id="mobileSidebarContainerTop" className="mds-row fullViewWidth ">
                <div className="mds-col-12"></div>
            </div>
            <div id="desktopSidebarContainer" className="mds-col-at-768-3 mds-col-at-992-3 mds-d-at-768-block mds-d-none mds-px-0">
                <aside>
                    <div id="sideBarComponent" className="mds-p-5 mds-no-gutters mds-mb-6">
                        <div className="mds-body-small mds-row mds-col-12 mds-mx-0 mds-px-0 mds-mb-3">
                            <div className="mds-d-flex mds-mx-0 mds-col-12">
                                <p className="mds-m-0 mds-color-text-regular" data-testid="text" style={{ height: 'fit-content;' }}>
                                    You're applying for:
                                </p>
                            </div>
                        </div>
                        <div className="mds-mt-0 sidebar-header mds-col-12">
                            <div className="">
                                <div className="mds-jc-space-between mds-ai-center">
                                    <h2 className="mds-color-text-regular mds-mt-0 mds-body-large-heavier mds-mb-0" tabIndex={-1}>
                                        <span>{props.title}</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="mds-col-12 mds-mt-4 mobile-sidebar-eCoupon">
                            <MdsAlert variant="success" size="mini" full-width="true" background="false" leading-padding="12" trailing-padding="16" alertTitle="We're applying your offer." inverse="false" shows-close-button="false" accessibleTextIcon="success icon" heading-level="0" focusable="true" read-accessible-text-on-focus="false"></MdsAlert>
                        </div>
                        <hr className="persistent-info-line mds-row mds-col-12 mds-mx-3 mds-my-4" />
                        <div className="mds-body-small mds-row mds-col-12 mds-mx-0 mds-px-0 mds-my-4">
                            <div className="mds-d-flex mds-mx-0 mds-col-12">
                                <MdsIcon type="ico_lock_locked_outline" color="default" size="24" remove-horizontal-margin="true"></MdsIcon>
                                <p className="mds-m-0 mds-color-text-regular mds-pl-3" data-testid="text" style={{ height: 'fit-content;' }}>
                                    <b>Connection secured.</b> We work to ensure your personal information stays safe.
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
            <div className="mds-col-at-576-2 mds-d-none mds-d-at-576-block mds-d-at-768-none"></div>
            <div id="centerContentContainer" className="mds-col-at-576-8 mds-col-at-768-6 mds-col-at-992-6 mds-col-12 mds-mt-4" style={{ paddingBottom: '0px' }}>
                <main>
                    {props.children}
                </main>
                <div id="mobileSidebarContainer" className="mds-row">
                    <div className="mds-col-12"></div>
                </div>
                <div className="mds-row mds-mx-at-576-0 mds-px-at-576-0"></div></div><div className="mds-col-at-576-2 mds-col-at-768-3 mds-col-at-992-3"></div></div></div>
}