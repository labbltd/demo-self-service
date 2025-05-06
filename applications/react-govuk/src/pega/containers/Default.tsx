import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function Default(props: { container: PContainer }) {
  return <>
    {props.container.view && (
      <GeneratePContainer container={props.container.view} />
    )}
    {props.container.children.map((child, index) => (
      <GeneratePContainer key={child.id + index} container={child} />
    ))}
  </>
}
