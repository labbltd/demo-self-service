import { useState } from "react"

export function BOISelect(props: {
    id: string,
    label: string,
    value: string,
    hint: string,
    select: (key: string) => void,
    options: { key: string, value: string }[]
}) {
    const [active, setActive] = useState(false);

    return <>
        <div className="sc-bhvsvk hfskxH field" data-id="field_1880_171" >
            <div className="sc-dVAgQd gRHQTq">
                <label htmlFor={props.id} className="field-label ">{props.label}</label>
            </div>
            {props.hint && <div className="sc-cXUDFq cqGMmD field-description-above" color="monotoneDark">
                <div className="sc-hvjqFJ fRyVuv">
                    <p color="monotoneDark" className="sc-gkhwGK hFYMkp">
                        {props.hint}
                    </p>
                </div>
            </div>}
            <div className="sc-ljKisr gqXwSY">
                <div className="sc-QsWun cRqrFI">
                    <template data-react-aria-hidden="true"></template>
                    <div data-testid="select" className="react-aria-Select" data-rac="">
                        <div className="sc-crmhzO gflEL">
                            <div className="sc-dEZtDB hSYKSS">
                                <button id=":r153:" type="button" data-react-aria-pressable="true" aria-labelledby="react-aria1831877564-:r15e:" aria-haspopup="listbox" aria-expanded="false" className="sc-jEBrHg sc-gsHOfL ftZiPo hwXXyo" data-rac="" tabIndex={0}
                                    onClick={() => setActive(true)}>
                                    <p className="sc-kThouk yzVXl">
                                        <span id="react-aria1831877564-:r15e:" className="sc-cvhvLv iIJwHm" data-rac="">{props.value}</span>
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true" className="sc-bkBUWa gPNWIB">
                                        <path fill="currentColor" d="m12 14.815 7.533-7.532a.933.933 0 0 1 .702-.29c.27.004.503.106.702.305a.96.96 0 0 1 .298.702c0 .27-.1.503-.298.702l-7.656 7.671c-.18.18-.383.315-.608.402-.224.087-.448.13-.673.13-.224 0-.448-.043-.673-.13a1.752 1.752 0 0 1-.607-.402L3.048 8.702a.942.942 0 0 1-.29-.71.997.997 0 0 1 .306-.71.96.96 0 0 1 .702-.297c.269 0 .503.099.702.298L12 14.815Z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div aria-hidden="true" data-react-aria-prevent-focus="true" data-a11y-ignore="aria-hidden-focus" data-testid="hidden-select-container" style={{ border: '0px', clip: 'rect(0px, 0px, 0px, 0px)', clipPath: 'inset(50%)', height: '1px', margin: '-1px', overflow: 'hidden', padding: '0px', position: 'absolute', width: '1px', whiteSpace: 'nowrap' }}>
                        <label>
                            <select tabIndex={-1} id={props.id}>
                                <option>
                                </option>
                                {props.options?.map(option => <option value={option.key} key={option.key}>{option.value}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        {active && <>
            <div style={{ position: 'fixed', inset: '0px' }} aria-hidden="true" onClick={() => setActive(false)}></div>
            <div style={{ display: 'contents' }}>
                <div className="sc-doJfcP jQzewn" data-rac="" aria-labelledby="" dir="ltr" data-trigger="Select" style={{ position: 'absolute', zIndex: 100000, maxHeight: '290px', left: '143.5px', top: '419px' }} role="dialog" tabIndex={-1} data-placement="bottom">
                    <div style={{ border: '0px', clip: 'rect(0px, 0px, 0px, 0px)', clipPath: 'inset(50%)', height: '1px', margin: '-1px', overflow: 'hidden', padding: '0px', position: 'absolute', width: '1px', whiteSpace: 'nowrap' }}>
                        <button id="react-aria1831877564-:r18j:" aria-label="Dismiss" tabIndex={-1} style={{ width: '1px', height: '1px' }}>
                        </button>
                    </div>
                    <span data-focus-scope-start="true" hidden>
                    </span>
                    <div id="react-aria1831877564-:r158:" aria-labelledby="" role="listbox" tabIndex={-1} data-collection="react-aria1831877564-:r18k:" className="sc-dovqRS jmZMyI" data-rac="" data-layout="stack" data-orientation="vertical">
                        <section role="group" className="react-aria-ListBoxSection" data-rac="">
                            {props.options?.map(option => <div key={option.key} role="option" aria-selected="false" tabIndex={-1} data-collection="react-aria1831877564-:r18k:" data-key="parents" data-react-aria-pressable="true" id="react-aria1831877564-:r158:-option-parents" className="sc-fnaTjL piqCy" data-rac="" data-selection-mode="single"
                                onClick={() => {
                                    props.select(option.value);
                                    setActive(false);
                                }}>
                                <div className="sc-jyPUfK hJyVaF">
                                    <div className="sc-JNBUd bbQBUJ">
                                        <div className="sc-eVCCQc gYsjaZ">
                                        </div>
                                        <div className="sc-kThouk kitHWm">{option.value}</div>
                                    </div>
                                </div>
                            </div>)}
                        </section>
                    </div>
                    <span data-focus-scope-end="true" hidden>
                    </span>
                    <div style={{ border: '0px', clip: 'rect(0px, 0px, 0px, 0px)', clipPath: 'inset(50%)', height: '1px', margin: '-1px', overflow: 'hidden', padding: '0px', position: 'absolute', width: '1px', whiteSpace: 'nowrap' }}>
                        <button id="react-aria1831877564-:r193:" aria-label="Dismiss" tabIndex={-1} style={{ width: '1px', height: '1px' }}>
                        </button>
                    </div>
                </div>
            </div>
        </>}
    </>
}