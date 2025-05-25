// Benefits: "<ul><li>Up to $100.00 per month of medication cover, included repeat</li><li>Cover of up to $X for hospital stays</li><li>Can claim for up to 1 family member in addition to yourself</li></ul>"
// CareLevel: "Premium"
// MonthlyCost: 150
// pxObjClass: "Labb-LabbCS-Data-CarePlan"
// pyDescription: "Upgraded level of care, cover for any hospital stay, regular repeat medication and 1 family member"
// pyLabel: "Advanced Care"
export default function HsbcPanel(props: {
    label: string,
    level: string,
    price: string,
    benefits: string,
    description: string,
    selected?: boolean,
    disabled?: boolean,
    onSelect?: () => void
}) {
    return <label className={'card' + (props.disabled ? ' inactive' : '')}>
        {!props.disabled && <input name="plan" className="radio" type="radio"
            checked={props.selected} onChange={() => props.onSelect?.()} />
        }
        <span className="plan-details">
            <span className="plan-type">{props.level}</span>
            <span className="plan-cost">${props.price}<span className="slash">/</span><abbr className="plan-cycle" title="month">mo</abbr></span>
            <span>{props.description}</span>
            <div dangerouslySetInnerHTML={{ __html: props.benefits }}></div>
        </span>
    </label>
}