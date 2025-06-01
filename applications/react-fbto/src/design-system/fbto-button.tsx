import React, { MouseEventHandler } from "react";

export default function Button(props: {
    variant: string,
    children: React.ReactNode,
    onClick: MouseEventHandler<HTMLButtonElement>
}) {
    const className = props.variant === 'primary' ? `btn btn-${props.variant}` : 'btn';
    return (
        <button type="button" className={className} onClick={props.onClick}>
            {props.children}
        </button>
    );
}
