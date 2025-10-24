import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { Card } from 'antd';

export default function Group(props: { container: PContainer }) {
  return props.container.config.showHeading ? <Card title={props.container.config.heading} style={{ marginBottom: '15px' }}>
    {
      props.container.config.instructions && !['none', 'casestep'].includes(props.container.config.instructions) && <div dangerouslySetInnerHTML={{ __html: props.container.config.instructions }}></div>
    }
    {props.container.children.map(child => (
      <GeneratePContainer key={child.id} container={child} />
    ))}
  </Card> : <>{props.container.children.map(child => (
    <GeneratePContainer key={child.id} container={child} />
  ))}</>
}
