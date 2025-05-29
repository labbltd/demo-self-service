import './mds-error-message.css'

export default function MdsErrorMessage(props: {
    variant?: string,
    background?: boolean,
    leadingPadding?: number
    trailingPadding?: number,
    size?: string,
    inverse?: boolean,
    showsCloseButton?: boolean,
    alertTitle?: string,
    accessibleTextIcon?: string,
}) {
    return <div className="alert alert--error alert--mini">
        <div className="alert__header alert__header--mini">
            <span className="alert__icon alert__icon--mini alert__icon--error" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                    <path fill="inherit" d="M23.955 4.3C13.045 4.3 4.2 13.145 4.2 24.055c0 10.911 8.845 19.756 19.755 19.756 10.911 0 19.756-8.845 19.756-19.756A19.755 19.755 0 0 0 23.955 4.3m-.049 32.596a3.764 3.764 0 1 1 3.813-3.763 3.79 3.79 0 0 1-3.813 3.763m2.934-12.03a3.054 3.054 0 0 1-3.013 2.39 2.667 2.667 0 0 1-2.647-2.39s-1.176-10.185-1.176-10.194c0-1.907 1.897-3.458 3.951-3.458s3.951 1.551 3.951 3.467z">
                    </path>
                </svg>
            </span>
            <div className="alert__title alert__title--mini alert__title--error" id="title-focus-target" tabIndex={-1} role="heading">
                <span id="accessible-text-title" className="alert__title-text">
                    <span className="accessible-text">{props.accessibleTextIcon}</span>
                    {props.alertTitle}
                </span>
            </div>
        </div>
        <div className="alert__desc">
            <div className="alert__desc-blk1">
            </div>
        </div>
    </div>
}