import { HomeTwoTone } from "@ant-design/icons";
import { View } from "@labb/dx-engine";
import { GeneratePContainer } from "@labb/react-adapter";

export default function DxView(props: { container: View }) {
    const { container } = props;

    return <div>
        {container.config.httpMessages?.map((message: any) =>
            <div key={message.message}>
                {message.type}: {message.message}
            </div>
        )}
        <div style={{display: 'flex', justifyContent: 'left'}}>
            {container.config.icon === 'home-solid' && <HomeTwoTone style={{fontSize: '40px', marginRight: '20px'}}/>}
            {container.config.title && <h1>{container.config.title}</h1>}
        </div>
        {container.config.showHeading && <h2>{container.config.heading}</h2>}
        {container.config.showLabel && <h3>{container.config.label}</h3>}
        {(container.config.instructions && !['none', 'casestep'].includes(container.config.instructions)) && <div dangerouslySetInnerHTML={{ __html: container.config.instructions }}></div>}
        {props.container.children.map((child) => (
            <GeneratePContainer key={child.id} container={child} />
        ))}
    </div>
}