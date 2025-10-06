export function BOISummaryItem(props: {
    label: string,
    value: string
}) {
    return <div className="sc-bXdtCk bcnARz u-mb-2">
        <div className="sc-hKDTPf dZPheP">
            <div className="sc-hvjqFJ fRyVuv">
                <p className="sc-gkhwGK hFYMkp">
                    <strong>{props.label}</strong>
                </p>
            </div>
        </div>
        <div className="sc-hKDTPf dZPheP">
            <p className="sc-gkhwGK kzQOZR">
                <span className="u-display-block">{props.value}</span>
            </p>
        </div>
    </div>
}