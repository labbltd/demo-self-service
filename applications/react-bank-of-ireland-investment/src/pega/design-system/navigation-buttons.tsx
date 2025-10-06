import { MouseEventHandler, ReactNode } from "react"

export function BOINavigationButtons(props: { children: ReactNode }) {
    return <div className="sc-ehXajm duKGyy form-navigation hide-title" color="monotoneDark">
        {props.children}
    </div>
}

export function BOIBackButton(props: {
    disabled: boolean,
    children: ReactNode,
    showArrow: boolean,
    shadow?: boolean,
    style?: Object,
    onClick: MouseEventHandler<HTMLButtonElement>
}) {
    return <button onClick={props.onClick} disabled={props.disabled ? true : undefined} data-disabled={props.disabled ? "true" : null} style={props.style} data-testid="button" type="button" tabIndex={0} data-react-aria-pressable="true" aria-label="Back to previous page of the form" className="sc-hrphqP jnHmVK" data-rac="" id="react-aria8716564887-:r2e:">
        {props.shadow !== false && <div className="sc-jyqoAZ iJCXBt"></div>}
        <div className="sc-cnVfeA cRyRxH">
            <div className="sc-eJZSpO llFwYq">
                {props.showArrow && <span className="sc-EZsnr vVHbt">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m7.373 12.75 5.17 5.17a.705.705 0 0 1 .22.521.743.743 0 0 1-.236.532.784.784 0 0 1-.527.225.7.7 0 0 1-.527-.225l-6.34-6.34A.829.829 0 0 1 4.877 12a.829.829 0 0 1 .256-.633l6.34-6.34a.715.715 0 0 1 .514-.212.748.748 0 0 1 .54.212.735.735 0 0 1 .233.535c0 .2-.078.38-.233.534L7.373 11.25H18.75c.213 0 .391.072.535.216A.726.726 0 0 1 19.5 12a.726.726 0 0 1-.215.535.726.726 0 0 1-.535.215H7.373Z">
                        </path>
                    </svg>
                </span>}
                <div className="sc-hFPzkB ljaiBx">
                    <div data-testid="button-text" className="sc-kThouk ijVKgh">{props.children}</div>
                </div>
            </div>
        </div>
    </button>
}

export function BOINextButton(props: {
    disabled: boolean,
    children: ReactNode,
    onClick: MouseEventHandler<HTMLButtonElement>
}) {
    return <button onClick={props.onClick} disabled={props.disabled ? true : undefined} data-disabled={props.disabled ? "true" : null} data-testid="button" type="button" data-react-aria-pressable="true" aria-label="Continue to next page of the form" className="sc-hrphqP jnHmVK" data-rac="" id="react-aria8716564887-:rc:">
        <div className="sc-jyqoAZ hsntrk"></div>
        <div className="sc-cnVfeA hEmqTl">
            <div className="sc-eJZSpO llFwYq">
                <div className="sc-hFPzkB ljaiBx">
                    <div data-testid="button-text" className="sc-kThouk ijVKgh">{props.children}</div>
                </div>
            </div>
        </div>
    </button>
}