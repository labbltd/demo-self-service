import { CloseCircleOutlined } from '@ant-design/icons';
import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function DxFieldGroupListItem(props: { container: PContainer }) {
  return <div style={{ border: '1px dashed #393939ff', padding: '5px', marginBottom: '5px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
      {props.container.config.label && <strong>{props.container.config.label}</strong>}
      {props.container.config.allowDelete && <CloseCircleOutlined style={{ cursor: 'pointer' }} onClick={() => props.container.config.deleteFieldGroupItem()}/>}
    </div>
    {props.container.children.map(child => (
      <GeneratePContainer key={child.id} container={child} />
    ))}
  </div>
}
