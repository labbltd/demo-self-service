import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function DefaultForm(props: { container: PContainer }) {
  return <>
    {props.container.children.map((child, index) => (
      <div key={child.id + index}>
        <GeneratePContainer container={child} />
      </div>
    ))}
  </>
}
