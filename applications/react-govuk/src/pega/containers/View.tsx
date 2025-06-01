import { View } from "@labb/dx-engine";
import { GeneratePContainer } from "@labb/react-adapter";

export default function DxView(props: { container: View }) {
    const { container } = props;

    return <>{container.config.httpMessages?.map((message: any) =>
        <div key={message.message}>
            {message.type}: {message.message}
        </div>
    )}
        {container.config.showHeading && <h2 className="govuk-heading-s">{container.config.heading}</h2>}
        {container.config.showLabel && <p className="govuk-body">{container.config.label}</p>}
        {(container.config.instructions && container.config.instructions !== 'none') && <p className="govuk-body" dangerouslySetInnerHTML={{ __html: container.config.instructions }}></p>}
        {props.container.children.map((child) => (
            <GeneratePContainer key={child.id} container={child} />
        ))}
    </>
}