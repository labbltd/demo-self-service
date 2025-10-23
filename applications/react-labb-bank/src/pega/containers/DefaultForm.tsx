import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function DefaultForm(props: { container: PContainer }) {
  const { container } = props;

  const nChildren = props.container.children[0].children.length;

  return <div style={{
    display: 'grid',
    gridTemplateColumns: `repeat(${nChildren > 1 ? container.config.NumCols ?? '1' : '1'}, minmax(0px, 1fr))`,
    gap: 'calc(0.5rem) calc(1rem)'
  }}>
    {props.container.children.map((child) => <GeneratePContainer container={child} key={child.id} />)}
  </div>
}
