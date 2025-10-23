import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function Region(props: { container: PContainer }) {
  return <>
    {props.container.children.map(child => (
      <GeneratePContainer key={child.id} container={child} />
    ))}
  </>
}
