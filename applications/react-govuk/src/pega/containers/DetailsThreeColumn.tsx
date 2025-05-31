import { PContainer } from "@labb/dx-engine";
import { GeneratePContainer } from "@labb/react-adapter";

export default function DetailsThreeColumns(props: { container: PContainer }) {
    return <div className="three-column">
        <dl className="govuk-summary-list">
            {props.container.children[0].children.map(child => <GeneratePContainer key={child.id} container={child} />)}
        </dl>
        <dl className="govuk-summary-list">
            {props.container.children[1].children.map(child => <GeneratePContainer key={child.id} container={child} />)}
        </dl>
        <dl className="govuk-summary-list">
            {props.container.children[2].children.map(child => <GeneratePContainer key={child.id} container={child} />)}
        </dl>
    </div>;
}