import './mds-alert.css'

export default function MdsAlert(props: {
    variant: string;
    size: string;
    background: string;
    inverse: string;
    focusable: string;
    alertTitle: string;
    accessibleTextIcon: string;
}) {
    return <div className="alert alert--full-width alert--success alert--mini" style={{ paddingLeft: '12px', paddingRight: '16px;' }}>
        <div className="alert__header alert__header--mini">
            <span className="alert__icon alert__icon--mini alert__icon--success" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                    <path fill="inherit" d="M24.07 4.3C13.095 4.3 4.2 13.196 4.2 24.17c0 10.973 8.896 19.868 19.87 19.868 10.973 0 19.868-8.895 19.868-19.869 0-10.973-8.896-19.868-19.869-19.869zm11.085 13.666l-10.47 15.632a2.977 2.977 0 01-2.531 1.409 2.967 2.967 0 01-2.015-.784l-6.69-6.144a2.977 2.977 0 114.03-4.376l4.119 3.781 8.605-12.843a2.982 2.982 0 014.952 3.325z">
                    </path>
                </svg>
            </span>
            <div className="alert__title alert__title--mini" id="title-focus-target" tabIndex={-1}>
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