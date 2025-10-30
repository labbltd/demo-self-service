import { useEffect, useRef, useState } from "react";

export default function VmSelect(props: {
    onChange(key: string): void;
    value?: string,
    label: string,
    disabled?: boolean,
    options: { key: string, value: string }[],
    errorMessage?: string,
    infoMessage?: string
}) {
    const [open, setOpen] = useState<boolean>(false);
    const clickTarget = useRef<HTMLElement>(null);

    useEffect(() => {
        function click(event: Event) {
            if (!event.composedPath().includes(clickTarget.current!)) {
                setOpen(false);
            }
        }
        document.addEventListener('click', click)
        return () => {
            document.removeEventListener('click', click);
        }
    }, [])
    return <div className="dropdown component">
        <div className="sh-MAIN_ACCOUNT_HOLDER  form-group dyn-form-field   initialized">
            <select name="MAIN_ACCOUNT_HOLDER"
                value={props.value}
                className="form-control ace-dropdown ace-placeholder option-holder dropdown sh-field  initialized select2-hidden-accessible"
                tabIndex={-1}>
                <option></option>
                {props.options.map(option => <option key={option.key} value={option.key}>{option.value}</option>)}
            </select>
            <span ref={clickTarget} onClick={() => { setOpen(!open) }} className={`select2 select2-container select2-container--ace form-control${open ? ' select2-container--open' : ''}`} dir="ltr" data-select2-id="14">
                <span className="selection">
                    <span className="select2-selection select2-selection--single" role="combobox" aria-expanded="false" tabIndex={0} aria-disabled="false" aria-label="Are you the account holder?. This element is mandatory.">
                        <span className="select2-selection__rendered" id="select2-MAIN_ACCOUNT_HOLDER-8p-container" role="textbox" aria-readonly="true">
                            <span className="select2-selection__placeholder">
                                Select
                            </span>
                        </span>
                        <span className="select2-selection__arrow" role="presentation">
                            <b role="presentation"></b>
                        </span>
                    </span>
                </span>
                <span className="dropdown-wrapper" aria-hidden="true"></span>
            </span>
            {props.errorMessage && <div className="ace-form-info">
                <div className="ace-form-info-l">
                    <div className="help-block with-errors" aria-live="assertive">
                        <ul className="list-unstyled">
                            <li>{props.errorMessage}</li>
                        </ul>
                    </div>
                </div>
            </div>}
            {props.infoMessage && <div tabIndex={-1} className="ace-form-popover fa fa-info-circle dyn-form-popover" aria-label="More info" data-toggle="popover" data-content="Your contact number should be 11 digits long" data-original-title="" title=""></div>}
            <label className="form-control-label">{props.label}</label>
            {open && <span className="select2-container select2-container--ace form-control select2-container--open" style={{ position: 'absolute', top: '81px', left: '0px' }}>
                <span className="select2-dropdown select2-dropdown--below" dir="ltr" style={{ width: '550px' }}>
                    <span className="select2-search select2-search--dropdown select2-search--hide">
                        <input className="select2-search__field" type="search" tabIndex={0} role="searchbox" aria-autocomplete="list" />
                    </span>
                    <span className="select2-results">
                        <ul className="select2-results__options" role="listbox" id="select2-MAIN_ACCOUNT_HOLDER-8p-results" aria-expanded="true" aria-hidden="false">
                            {props.options.map(option => <li key={option.key}
                                className={`select2-results__option`}
                                onClick={() => { props.onChange(option.key) }}
                                onMouseEnter={(e) => (e.target as HTMLLIElement).classList.add('select2-results__option--highlighted')}
                                onMouseLeave={(e) => (e.target as HTMLLIElement).classList.remove('select2-results__option--highlighted')}
                                role="option" aria-selected="false" data-select2-id="select2-MAIN_ACCOUNT_HOLDER-8p-result-5hho-YES">
                                {option.value}
                            </li>
                            )}
                        </ul>
                    </span>
                </span>
            </span>}
        </div>
    </div>
}