import MdsButton from '../mds-button/mds-button';
import MdsTooltip from '../mds-tooltip/mds-tooltip';
import './mds-brand-bar.css';

export default function MdsBrandBar(props: {
    variant: string,
    logo: string,
    opaque: string,
    expanded: string,
    opacity: string,
    setExpanded: (ex: boolean) => void
}) {
    return <div className="brand-bar brand-bar--default brand-bar--opaque" role="banner"><div className="brand-bar__container-wrap">
        <div className="brand-bar__container-wrap-inner">
            <div className="brand-bar__container"><div className="brand-bar__left-container">
                <nav className="brand-bar__hamburger-wrap" aria-label="Menu">
                    <MdsButton onClick={() => props.setExpanded(true)} variant="tertiary" width-type="content" small="false" accessible-text="" disable-live-region="false" inactive="false" tab-focusable="true" type="button" inverse="true" is-loading="false" className="brand-bar__hamburger-button mds-button--cmb" iconType="ico_hamburger_menu" icon-position="icon_only" icon-accessible-description="Opens main menu">
                        <MdsTooltip edge-detection="true" manual-control="false" visible="false" message="Opens main menu"></MdsTooltip>
                    </MdsButton>
                </nav>
                <div className="brand-bar__logo-container">
                    <a className="brand-bar__logo-link" href="https://www.chase.com" aria-label="Chase logo">
                        <img className="brand-bar__image" src={props.logo} alt="Chase logo" />
                    </a>
                </div>
            </div>
                <div className="brand-bar__right-container">
                    <div className="brand-bar__search-box-container brand-bar__search-box-container--not-expanding brand-bar__utilities--button-hidden">
                        <MdsButton variant="tertiary" width-type="content" small="false" accessible-text="" disable-live-region="false" inactive="false" tab-focusable="true" type="button" inverse="true" is-loading="false" className="brand-bar__search-box-button mds-button--cmb" iconType="ico_search" icon-position="icon_only" icon-accessible-description="undefined">
                            <MdsTooltip edge-detection="true" manual-control="false" visible="false"></MdsTooltip>
                        </MdsButton>
                    </div>
                    <div className="brand-bar__right-container">
                        <MdsButton variant="tertiary" width-type="content" small="false" accessible-text="" disable-live-region="false" inactive="false" tab-focusable="true" type="button" inverse="true" is-loading="false" className="brand-bar__utilities brand-bar__utilities--security-button mds-button--cmb brand-bar__utilities--button-hidden" iconType="ico_shield" icon-position="icon_only" icon-accessible-description="undefined">
                            <MdsTooltip edge-detection="true" manual-control="false" visible="false" ></MdsTooltip>
                        </MdsButton>
                        <MdsButton variant="tertiary" width-type="content" small="false" accessible-text="" disable-live-region="false" inactive="false" tab-focusable="true" type="button" inverse="true" is-loading="false" className="brand-bar__utilities brand-bar__utilities--conversation-deck-button mds-button--cmb brand-bar__utilities--button-hidden" iconType="ico_flag" icon-position="icon_only" icon-accessible-description="undefined">
                            <MdsTooltip edge-detection="true" manual-control="false" visible="false" ></MdsTooltip>
                        </MdsButton>
                        <MdsButton variant="tertiary" width-type="content" small="false" accessible-text="" disable-live-region="false" inactive="false" tab-focusable="true" type="button" inverse="true" is-loading="false" className="brand-bar__utilities brand-bar__utilities--profile-button mds-button--cmb brand-bar__utilities--button-hidden" iconType="ico_people_profile" icon-position="icon_only" icon-accessible-description="undefined">
                            <MdsTooltip edge-detection="true" manual-control="false" visible="false" ></MdsTooltip>
                        </MdsButton>
                        <MdsButton variant="primary" width-type="content" small="true" accessible-text="" disable-live-region="false" inactive="false" tab-focusable="true" type="button" inverse="true" is-loading="false" className="brand-bar__utilities brand-bar__utilities--open_account_button mds-button--cmb brand-bar__utilities--button-hidden"></MdsButton>
                        <MdsButton variant="tertiary" width-type="content" small="true" accessible-text="" disable-live-region="false" inactive="false" tab-focusable="true" type="button" inverse="true" is-loading="false" className="brand-bar__sign-in-out-button mds-button--cmb" text="Exit" iconType=""></MdsButton>
                    </div>
                </div>
            </div>
            <div className="brand-bar__slot brand-bar__slot--default">
            </div>
        </div>
    </div>
    </div>
}