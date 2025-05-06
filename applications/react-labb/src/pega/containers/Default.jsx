import { GeneratePContainer } from '@labb/react-adapter';

export default function DxDefault(props) {
    return props.container.children.map((child, index) => (
        <GeneratePContainer key={child.id + index} container={child} />
    ))
}
