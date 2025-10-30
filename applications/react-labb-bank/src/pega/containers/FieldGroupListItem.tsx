import { CloseCircleOutlined } from '@ant-design/icons';
import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { useState } from 'react';

export default function DxFieldGroupListItem(props: { container: PContainer }) {
  const [show, setShow] = useState<boolean>(true);

  return <div style={{ border: '1px dashed #393939ff', padding: '5px', marginBottom: '5px' }}>
    <div onClick={() => setShow(!show)}
      style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', marginBottom: '5px', borderBottom: '1px dashed #393939ff' }}>
      {props.container.config.label && <strong>{props.container.config.label}</strong>}
      {props.container.config.allowDelete && <CloseCircleOutlined style={{ cursor: 'pointer' }} onClick={() => props.container.config.deleteFieldGroupItem()} />}
    </div>
    <div style={{ display: show ? 'block' : 'none' }}>
      {props.container.children.map(child => (
        <GeneratePContainer key={child.id} container={child} />
      ))}
    </div>
  </div>
}
