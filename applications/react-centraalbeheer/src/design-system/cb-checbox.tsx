import { ChangeEventHandler } from "react";

export default function Checkbox(props: {
    id: string,
    label: string,
    checked: boolean,
    onChange: ChangeEventHandler<HTMLInputElement>
}) {
    return (
        <label className="input-checkbox__label label" htmlFor={props.id}>
            <input
                id={props.id}
                type="checkbox"
                className="input-checkbox__checkbox input"
                checked={props.checked}
                onChange={props.onChange}
            />
            <div className="input-checkbox__custom-input"></div>
            <span className="input-checkbox__title">{props.label}</span>
        </label>
    );
}
