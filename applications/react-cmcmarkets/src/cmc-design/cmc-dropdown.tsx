import { useState } from "react";

export default function CmCDropdown(props: { label: string, helperText: string, width?: string, value?: string, options: { key: string, value: string }[], errorMessage?: string, selected: (key: string) => void, flagged?: boolean }) {
    const [opened, setOpened] = useState(false);
    const { width, value, options, errorMessage, selected, flagged = false } = props;

    function toFlag() {
        const val = toValue();
        if (!val) return '';
        return `flags_flag_${{
            'Dutch': 'nl__Gza-M',
            'Netherlands': 'nl__Gza-M',
            'British': 'gb__x6iY-',
            'United Kingdom': 'gb__x6iY-',
            'German': 'de__Pa3Va',
            'Germany': 'de__Pa3Va',
            'Belgium': 'be__ffpcY',
            'Belgian': 'be__ffpcY',
            'France': 'fr__-WBHj',
            'French': 'fr__-WBHj'
        }[val]}`;
    }

    function toValue() {
        return options?.find(o => o.key === value)?.value
    }

    return <div className={`jCqVct ipcbgk ${opened ? 'css-pg7suc-container' : 'css-nf92ca-container'}`} style={{ width }}>
        <div onClick={() => { setOpened(!opened) }}
            className={`cmc-select__control cmc-select__control--is-focused cmc-select__control--menu-is-open ${opened ? 'css-w63yqz-control' : 'css-fw80dc-control'}${errorMessage ? ' css-1x3b2q3-control FieldGroup_error__o3FYl' : ''}`}>
            <div className="cmc-select__value-container cmc-select__value-container--has-value css-1hwfws3">
                <div className="cmc-select__single-value css-1m74qt2-singleValue">
                    {flagged && <div className={`sc-JrDLc jSoIcF flags_flag__u1q ${toFlag()} flags_flagLeft__100a0`}>{toValue()}</div>}
                    {!flagged && toValue()}
                </div>
                <div className="css-1g6gooi">
                    <div className="cmc-select__input" style={{ display: 'inline-block' }}>
                        {/* <input autoCapitalize="none" autoComplete="off" autoCorrect="off" id="react-select-162-input" spellCheck="false" tabIndex={0} type="text" aria-autocomplete="list" value=""
                      style={{ boxSizing: 'content-box', width: '2px', background: '0px center', border: '0px', fontSize: 'inherit', opacity: '1', outline: '0px', padding: '0px', color: 'inherit' }} /> */}
                        <div style={{ position: 'absolute', top: '0px', left: '0px', visibility: 'hidden', height: '0px', overflow: 'scroll', whiteSpace: 'pre', fontSize: '16px', fontFamily: 'Arial', fontWeight: '400', fontStyle: 'normal', letterSpacing: 'normal', textTransform: 'none' }}>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cmc-select__indicators css-1wy0on6">
                <span className="cmc-select__indicator-separator css-43ykx9-indicatorSeparator"></span>
                <div aria-hidden="true" className="cmc-select__indicator cmc-select__dropdown-indicator css-1e4t2s-indicatorContainer">
                    <div className="SelectWithAutoComplete_indicator__Bwh2S"></div>
                </div>
            </div>
        </div>
        {opened && <div className="cmc-select__menu css-1f8ao6g-menu">
            <div className="cmc-select__menu-list css-gbidrl">
                {options?.map(
                    (option: { key: string, value: string }) => (
                        <div key={option.key} onClick={(e) => {
                            selected(option.key);
                            setOpened(false);
                        }}
                            className={`cmc-select__option css-${option.key === value ? '1q5szw' : 'c884mm'}-option`} id="react-select-162-option-0" tabIndex={-1}>
                            {option.value}
                        </div>
                    )
                )}
            </div>
        </div>}
    </div>
}