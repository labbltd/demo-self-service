import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function DefaultForm(props: { container: PContainer }) {
  return <>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0px, 1fr))', gap: 'calc(0.5rem) calc(1rem)' }}>
      {props.container.children.map((child, index) => (
        <div key={child.id + index}>
          <GeneratePContainer container={child} />
        </div>
      ))}
    </div>
  </>
}
