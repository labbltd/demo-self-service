import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function Default(props: { container: PContainer }) {
  return props.container.config.NumCols &&
    <div className={props.container.config.NumCols === '2' ? 'jKDWVh' : ''}>
      <Contents container={props.container} />
    </div> ||
    <Contents container={props.container} />
}

function Contents(props: { container: PContainer }) {
  return <>
    {props.container.config.instructions && props.container.config.instructions !== 'none' && <div dangerouslySetInnerHTML={{ __html: props.container.config.instructions }} ></div>}

    {
      props.container.children.map((child, index) => (
        <GeneratePContainer key={child.id + index} container={child} />
      ))
    }
  </>
}
