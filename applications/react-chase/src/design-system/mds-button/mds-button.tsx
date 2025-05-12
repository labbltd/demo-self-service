import './mds-button.css'

export default function MdsButton(props: {
    variant: string,
    small: string,
    inverse: string,
    inactive: string,
    type: string,
    className: string,
    text?: string,
    iconType?: string,
    onClick?: () => void,
    children?: JSX.Element | JSX.Element[]
}) {
    return <button type="button" className="button button--tertiary button--small button--icon_only button--inverse" tabIndex={0} onClick={() => props.onClick?.()}>
        <span className="button__icon-container button__icon-container--icon_only button__icon-container--small">
            <span className="button__icon button__icon--icon_only button__icon--small" aria-hidden="true">
                {props.iconType === 'ico_close' && <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="inherit" d="M27.966 24.512l13.53-13.53a2.753 2.753 0 10-3.894-3.891L24.075 20.62l-13.53-13.53a2.752 2.752 0 00-3.891 3.891l13.53 13.53-13.53 13.53a2.752 2.752 0 103.89 3.891l13.531-13.53 13.527 13.53a2.752 2.752 0 103.892-3.89L27.966 24.512z"></path></svg>}
                {props.iconType === 'ico_hamburger_menu' && <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="inherit"><path d="M39 12.617H9a1.5 1.5 0 110-3h30a1.5 1.5 0 110 3zM39 25.617H9a1.5 1.5 0 110-3h30a1.5 1.5 0 110 3zM39 37.617H9a1.5 1.5 0 110-3h30a1.5 1.5 0 110 3z"></path></g></svg>}
            </span>
        </span>
        <span id="verticalNavCloseButton-accessible-text" className="accessible-text">
            {props.text}
        </span>
    </button>
}