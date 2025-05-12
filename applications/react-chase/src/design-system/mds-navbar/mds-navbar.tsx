import { useState } from "react";
import MdsBrandBar from "../mds-brand-bar/mds-brand-bar";
import MdsButton from "../mds-button/mds-button";
import MdsVerticalNavigation from "../mds-vertical-navigation/mds-vertical-navigation";
import MdsVerticalNavigationFooter from "../mds-vertical-navigation/mds-vertical-navigation-footer/mds-vertical-navigation-footer";
import MdsVerticalNavigationItem from "../mds-vertical-navigation/mds-vertical-navigation-item/mds-vertical-navigation-item";

export default function MdsNavbar() {
    const [expanded, setExpanded] = useState(false);
    return <div className="brandBar">
        <MdsBrandBar setExpanded={setExpanded} variant="default" logo="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj4KICA8cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTcuODQ3MTI0OS4zMjk0OTU5MTRDMTcuMzg2NDUzMi4zMjkyMTU0NzMgMTYuOTQ0NTQzLjUxMTk3MTUyNiAxNi42MTg2MzM0LjgzNzU1MDI0OCAxNi4yOTI3MjM5IDEuMTYzMTI4OTcgMTYuMTA5MzMyMSAxLjYwNDg1MzM1IDE2LjEwOTMzMjEgMi4wNjU1MjUxM0wxNi4xMDkzMzIxIDE0LjIyODMxMDggNDguMjQ3NTYyNSAxNC4yMjgzMTA4IDMzLjYxMTA4NTcuMzMxOTY1Njk1IDE3Ljg0NzEyNDkuMzI5NDk1OTE0ek00OS40MjE2MTM0IDE3LjkwNjM5MTlDNDkuNDIxNjEzNCAxNy40NDU4NjAxIDQ5LjIzODUxNTUgMTcuMDA0MjI1IDQ4LjkxMjQ3MzQgMTYuNjc4OTc3MiA0OC41ODY0MzE0IDE2LjM1MzcyOTQgNDguMTQ0MzUwOCAxNi4xNzE2MTM5IDQ3LjY4MzgyMDYgMTYuMTcyODI2NEwzNS41MjQ5MTU1IDE2LjE3MjgyNjQgMzUuNTI0OTE1NSA0OC4zMDYxMjQgNDkuNDE4NDM4NCAzMy42Njk2NDcxIDQ5LjQyMTYxMzQgMTcuOTA2MzkxOXpNMzEuODM2MjUxIDQ5LjQ3MzExOTJDMzIuMjk2NjM4NyA0OS40NzI3NDU0IDMyLjczODAwMDcgNDkuMjg5NDAxNyAzMy4wNjMxNDY4IDQ4Ljk2MzQ2MTcgMzMuMzg4MjkyOSA0OC42Mzc1MjE2IDMzLjU3MDU1OTUgNDguMTk1NzEzNiAzMy41Njk4MTI4IDQ3LjczNTMyNjRMMzMuNTY5ODEyOCAzNS41NzU3MTU4IDEuNDM1ODEzMzcgMzUuNTc1NzE1OCAxNi4wNjgwNTY5IDQ5LjQ2OTIzODYgMzEuODM2MjUxIDQ5LjQ3MzExOTJ6TS4yNjI0Njc5NDggMzEuODk3NjM0N0MuMjYyMDc4MjIgMzIuODU1OTQ2OCAxLjAzODQyMTIgMzMuNjMzMjM3MyAxLjk5NjczMzA5IDMzLjYzNDAxNjRMMTQuMTYwOTI5OCAzMy42MzQwMTY0IDE0LjE2MDkyOTggMS40OTkzMTM3MS4yNjUyOTAzMzIgMTYuMTM0MDI2Ny4yNjI0Njc5NDggMzEuODk3NjM0N3oiLz4KPC9zdmc+Cg==" logo-mobile="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj4KICA8cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTcuODQ3MTI0OS4zMjk0OTU5MTRDMTcuMzg2NDUzMi4zMjkyMTU0NzMgMTYuOTQ0NTQzLjUxMTk3MTUyNiAxNi42MTg2MzM0LjgzNzU1MDI0OCAxNi4yOTI3MjM5IDEuMTYzMTI4OTcgMTYuMTA5MzMyMSAxLjYwNDg1MzM1IDE2LjEwOTMzMjEgMi4wNjU1MjUxM0wxNi4xMDkzMzIxIDE0LjIyODMxMDggNDguMjQ3NTYyNSAxNC4yMjgzMTA4IDMzLjYxMTA4NTcuMzMxOTY1Njk1IDE3Ljg0NzEyNDkuMzI5NDk1OTE0ek00OS40MjE2MTM0IDE3LjkwNjM5MTlDNDkuNDIxNjEzNCAxNy40NDU4NjAxIDQ5LjIzODUxNTUgMTcuMDA0MjI1IDQ4LjkxMjQ3MzQgMTYuNjc4OTc3MiA0OC41ODY0MzE0IDE2LjM1MzcyOTQgNDguMTQ0MzUwOCAxNi4xNzE2MTM5IDQ3LjY4MzgyMDYgMTYuMTcyODI2NEwzNS41MjQ5MTU1IDE2LjE3MjgyNjQgMzUuNTI0OTE1NSA0OC4zMDYxMjQgNDkuNDE4NDM4NCAzMy42Njk2NDcxIDQ5LjQyMTYxMzQgMTcuOTA2MzkxOXpNMzEuODM2MjUxIDQ5LjQ3MzExOTJDMzIuMjk2NjM4NyA0OS40NzI3NDU0IDMyLjczODAwMDcgNDkuMjg5NDAxNyAzMy4wNjMxNDY4IDQ4Ljk2MzQ2MTcgMzMuMzg4MjkyOSA0OC42Mzc1MjE2IDMzLjU3MDU1OTUgNDguMTk1NzEzNiAzMy41Njk4MTI4IDQ3LjczNTMyNjRMMzMuNTY5ODEyOCAzNS41NzU3MTU4IDEuNDM1ODEzMzcgMzUuNTc1NzE1OCAxNi4wNjgwNTY5IDQ5LjQ2OTIzODYgMzEuODM2MjUxIDQ5LjQ3MzExOTJ6TS4yNjI0Njc5NDggMzEuODk3NjM0N0MuMjYyMDc4MjIgMzIuODU1OTQ2OCAxLjAzODQyMTIgMzMuNjMzMjM3MyAxLjk5NjczMzA5IDMzLjYzNDAxNjRMMTQuMTYwOTI5OCAzMy42MzQwMTY0IDE0LjE2MDkyOTggMS40OTkzMTM3MS4yNjUyOTAzMzIgMTYuMTM0MDI2Ny4yNjI0Njc5NDggMzEuODk3NjM0N3oiLz4KPC9zdmc+Cg==" logo-destination="https://www.chase.com" logo-accessible-text="Chase logo" menu-button="true" menu-button-inactive="false" conversation-deck-button="false" conversation-deck-button-inactive="false" search-button-inactive="false" accessible-hamburger-menu-name="Menu" accessible-hamburger-menu-button-name="Opens main menu" container-accessible-role-flag="true" container-accessible-role="banner" security-button="false" security-button-inactive="false" profile-and-settings-button="false" profile-and-settings-button-inactive="false" open-account-button-inactive="false" sign-in-out-button-text="Exit" opaque="true" expanded="false" opacity="full" ></MdsBrandBar>
        {expanded && <>
            <div id="shadow" className="shadow shadowOn"></div>
            <div id="verticalNavigationContainer" className="verticalNav verticalNavOpen" aria-hidden="true" tabIndex={-1}>
                <div className="verticalNavCloseButton">
                    <MdsButton onClick={() => setExpanded(false)} width-type="layout" icon-position="icon_only" variant="tertiary" small="true" disable-live-region="false" inverse="true" tooltip-alignment="center" tooltip-pointer-placement="8" tooltip-placement="below" icon-type="ico_close" inactive="false" accessible-text="Closes main menu" tab-focusable="true" type="button" is-loading="false" className="mds-button--cmb"></MdsButton>
                </div>
                <MdsVerticalNavigation inverse="true" accessible-name="ACCOUNT_ORIGINATION_MENU.accessibleNameLabel" active-index="-1">
                    <MdsVerticalNavigationItem label="RESOURCES" type="heading" expanded="false" href="javascript:void(0)" ></MdsVerticalNavigationItem>
                    <MdsVerticalNavigationItem label="Privacy" type="link" expanded="false" icon="" href="javascript:void(0)"></MdsVerticalNavigationItem>
                    <MdsVerticalNavigationItem label="Security" type="link" expanded="false" icon="" href="javascript:void(0)"></MdsVerticalNavigationItem>
                    <MdsVerticalNavigationFooter>
                        <a href="https://www.chase.com/resources/web-accessibility" target="_blank" rel="noreferrer noopener" id="footer-0" aria-label="">
                            Our commitment to accessibility
                        </a>
                        <a href="https://www.chase.com/resources/terms-conditions" target="_blank" rel="noreferrer noopener" id="footer-1" aria-label="">
                            Terms of use
                        </a>
                        <span id="footer-2">
                            JPMorgan Chase Bank, N.A. Member FDIC
                        </span>
                        <span id="copyright">
                            ©2025 JPMorgan Chase &amp; Co.</span>
                    </MdsVerticalNavigationFooter>
                </MdsVerticalNavigation>
            </div>
        </>}
    </div>
}