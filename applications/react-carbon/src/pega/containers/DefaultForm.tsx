import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function DxDefaultForm(props: { container: PContainer }) {
  if (props.container.children.length === 0) {
    return null;
  }
  return <div style={{ paddingTop: '15px' }}>
    {props.container.config.label && props.container.config.showLabel ? <h2>{props.container.config.label}</h2> : null}
    {props.container.config.instructions && props.container.config.instructions !== 'none' ? <div dangerouslySetInnerHTML={{ __html: props.container.config.instructions }}></div> : null}
    {props.container.children.map((child, index) => (
      <GeneratePContainer key={child.id + index} container={child} />
    ))}
  </div>
}
