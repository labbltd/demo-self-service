import { View } from "@labb/dx-engine";
import { GeneratePContainer } from "@labb/react-adapter";

export default function DxView(props: { container: View }) {
    const { container } = props;
    const classes = [];
    if(container.pconnect.getComponentName().startsWith('Group')) {
        classes.push('group');
    }
    if(container.config.readOnly) {
        classes.push('readOnly');
    }
    return <div className={classes.join(' ')}>
        {container.config.httpMessages?.map((message: any) =>
            <div key={message.message}>
                {message.type}: {message.message}
            </div>
        )}
        {container.config.showHeading && <h2>{container.config.heading}</h2>}
        {container.config.showLabel && <span>{container.config.label}</span>}
        {(container.config.instructions && container.config.instructions !== 'none') && <div dangerouslySetInnerHTML={{ __html: container.config.instructions }}></div>}
        <div className="body">
            {props.container.children.map((child) => (
                <GeneratePContainer key={child.id} container={child} />
            ))}
        </div>
    </div>
}