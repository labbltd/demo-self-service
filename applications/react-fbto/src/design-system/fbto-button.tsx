import React, { MouseEventHandler } from "react";

export default function Button(props: {
    variant: string,
    children: React.ReactNode,
    onClick: MouseEventHandler<HTMLButtonElement>
}) {
    const className = `btn btn-${props.variant}`;
    return (
        <button type="button" className={className} onClick={props.onClick}>
            {props.children}
        </button>
    );
}
