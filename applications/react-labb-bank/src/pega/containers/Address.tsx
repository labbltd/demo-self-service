import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { Card } from 'antd';

export default function Group(props: { container: PContainer }) {
  return <Card title={props.container.config.label} style={{ marginBottom: '15px' }}>
    {props.container.children.map(child => (
      <GeneratePContainer key={child.id} container={child} />
    ))}
  </Card>
}
