import { ActionButton, ActionButtons } from "@labb/constellation-core-types"

export default function Buttons(props: {
    buttons: ActionButtons,
    clicked: (button: ActionButton) => void
}) {
    return <div className="sc-lnPyaJ foYhYX">
        <div className="sc-eulNck kOgcLI"></div>
        {props.buttons.secondary.map(button => <button
            key={button.name}
            onClick={_ => props.clicked(button)}
            className="loading_ldOver__UXQxR common_primary__K12Bh common_button__EFYjH common_themeGrey__Y4ce0 sc-eBHhsj iOnQSt">
            {button.name}
            <div className="loading_ld__j34ns loading_ldRing__C0tM8 loading_ldCycle__4Kdj6 LoadingButton_buttonIcon__-T-jl undefined"></div>
        </button>)}
        {props.buttons.main.map(button => <button
            key={button.name}
            onClick={_ => props.clicked(button)}
            className="loading_ldOver__UXQxR common_primary__K12Bh common_button__EFYjH sc-eBHhsj iOnQSt">
            {button.name}
            <div className="loading_ld__j34ns loading_ldRing__C0tM8 loading_ldCycle__4Kdj6 LoadingButton_buttonIcon__-T-jl undefined"></div>
        </button>)}
    </div>
}