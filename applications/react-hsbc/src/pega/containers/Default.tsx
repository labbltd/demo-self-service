import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function DxDefault(props: { container: PContainer }) {
  return <>
    {props.container.children.map((child, index) => (
      <GeneratePContainer key={child.id + index} container={child} />
    ))}
  </>
}
