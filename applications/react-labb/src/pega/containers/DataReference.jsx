import { GeneratePContainer } from '@labb/react-adapter';

export default function DxDataReference(props) {
    return <>
        <pre>DataReference</pre>
        {props.container.children.map((child, index) => (
            <GeneratePContainer key={child.id + index} container={child} />
        ))}
    </>
}
