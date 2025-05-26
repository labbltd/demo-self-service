import { MouseEventHandler } from "react";

export function Button(props: {
    label: string,
    variant: string,
    onClick: MouseEventHandler<HTMLButtonElement>
}) {
    const iconMap: { [key: string]: string } = {
        primary: 'btn--primary btn--arrow-right',
        secondary: '',
        add: 'btn--plus',
        back: 'btn--arrow-left'
    }
    return (
        <button type="button" className={`btn ${iconMap[props.variant]}`} onClick={props.onClick}>
            {props.label}
        </button>
    );
}
