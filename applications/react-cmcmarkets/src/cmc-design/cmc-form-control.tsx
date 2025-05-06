export default function CmCFormControl(props: { label: string, helperText?: string, errorMessage?: string, fullwidth?: boolean, children: JSX.Element | JSX.Element[] }) {
    const { label, helperText, errorMessage } = props;
    return <div className="sc-jXbUNg kdpnEA">
        <div className="sc-imWYAI jCqVct" style={{ width: props.fullwidth ? '50%' : '25%' }}>
            <div className="sc-imWYAI jCqVct sc-jlZhew kdTyRt">
                <span>{label}</span>
            </div>
        </div>
        <div className="sc-imWYAI jCqVct" style={{ width: '50%' }}>
            {props.children}
            {errorMessage && <div className="common_errorMessage__cHkzJ" style={{ width: '100%', maxWidth: '100%', margin: '0px' }}>{errorMessage}</div>}
        </div>
        {helperText && <div className="sc-imWYAI jCqVct sc-dAlyuH htiSTU" style={{ width: '25%' }}><div className="ContainerWithArrow_arrowBox__Y1X5P ContainerWithArrow_left__jMswq ContainerWithArrow_topHalf__EeMo9 ContainerWithArrow_sp1__16HF2 ContainerWithArrow_sp2__NtRXR ContainerWithArrow_sp3__VVKwp sc-kpDqfm CwvKY"><div className="sc-cwHptR kPJBEd">{helperText}</div></div></div>}
    </div>
}