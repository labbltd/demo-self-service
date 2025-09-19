import CmCFormControl from "./cmc-form-control";

export default function CmCRadio(props: { label: string, value: string, options: { key: string, value: string }[], helperText: string, errorMessage: string, selected: (key: string) => void }) {
    const { label, options, value, selected, helperText, errorMessage } = props;
    return <CmCFormControl label={label} helperText={helperText} errorMessage={errorMessage}>
        <div className="sc-hmdomO khsNhc radioGroup">
            {options.map(
                (option: { key: string; value: string }) => <div key={option.key}
                    className="sc-bXCLTC gBwSKN option">
                    <div className="sc-jsJBEP ecfTMz">
                        <input type="radio"
                            className="sc-koXPp frOGfV"
                            checked={value === option.key}
                            onChange={() => {
                                selected(option.key)
                            }}
                            name={label}
                            id={`${label}.${option.key}`}
                            value={option.key} />
                        <label className="sc-eeDRCY kRoWJL label" htmlFor={option.key}
                            onClick={(e) => {
                                selected(option.key);
                            }}>
                            <span className={"sc-bmzYkS " + (value === option.key ? 'hDQAcB' : 'iyCTVt')}></span>
                            {option.value}
                        </label>
                    </div>
                </div>
            )}
        </div>
    </CmCFormControl>
}