import { PContainer } from "@labb/dx-engine";
import { GeneratePContainer } from "@labb/react-adapter";

export default function DxCaseSummary(props: { container: PContainer }) {
    const { container } = props;
    return <details className="govuk-details">
        <summary className="govuk-details__summary">
            <span className="govuk-details__summary-text">
                Case Details
            </span>
        </summary>
        <div className="govuk-details__text">
            <dl className="govuk-summary-list">
                {container.children.map(child => <GeneratePContainer key={child.id} container={child} />)}
            </dl>
        </div>
    </details>

}