import './mds-icon.css';

export default function MdsIcon(props: {
    color: string,
    size: string,
    type: string
}) {
    return <div className="icon-container">
        <div className={`icon icon--default icon--${props.size}`} aria-hidden="true">
            {props.type === 'ico_lock_locked_outline' && <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                <g fill="inherit">
                    <path d="M36.666 16.468h-4.43v-5.1c0-3.98-3.63-7.22-8.09-7.22s-8.08 3.24-8.08 7.22v5.1h-4.44a4.66 4.66 0 00-4.38 4.88v17.9a4.65 4.65 0 004.38 4.87h25.04a4.644 4.644 0 004.38-4.87v-17.9a4.653 4.653 0 00-4.38-4.88zm-17.6-5.1c0-2.33 2.28-4.22 5.08-4.22 2.8 0 5.09 1.89 5.09 4.22v5.1h-10.17v-5.1zm18.98 27.88c0 1.01-.63 1.87-1.38 1.87h-25.04c-.75 0-1.38-.86-1.38-1.87v-17.9c0-1.02.63-1.88 1.38-1.88h25.04c.75 0 1.38.86 1.38 1.88v17.9z">
                    </path>
                    <path d="M24.448 26.41a1.5 1.5 0 00-1.5 1.5v5.274a1.5 1.5 0 003 0V27.91a1.5 1.5 0 00-1.5-1.5z">
                    </path>
                </g>
            </svg>}
        </div>
    </div>
}