import { ChangeEventHandler } from "react";

export default function RadioGroup(props: {
    label: string,
    name: string,
    options: { key: string, value: string }[],
    onChange: ChangeEventHandler<HTMLInputElement>,
    selectedValue: string
}) {
    return <>
        <div className="row">
            <div className="col-12 col-md-6">
                <p className="u-mb-0.5">
                    <strong>{props.label}</strong>
                </p>
                <div className="input-group">
                    <div className="input-radio">
                        {props.options.map(({ key, value }) => (
                            <label key={value} className="input-radio__label label">
                                <input
                                    type="radio"
                                    name={props.name}
                                    className="input-radio__radio input"
                                    value={key}
                                    checked={props.selectedValue === key}
                                    onChange={props.onChange}
                                />
                                <div className="input-radio__custom-input"></div>
                                <span className="input-radio__title">{value}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
}
