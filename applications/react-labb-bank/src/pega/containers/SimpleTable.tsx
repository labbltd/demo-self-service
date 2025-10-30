import { SimpleTable } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { Button } from 'antd';

export default function DxSimpleTable(props: { container: SimpleTable }) {
  return <>
    {props.container.children.map(child => (
      <GeneratePContainer key={child.id} container={child} />
    ))}
    {props.container.config.validatemessage && <em>{props.container.config.validatemessage}</em>}
    {props.container.config.multiRecordDisplayAs === 'fieldGroup' && <Button
      onClick={() => props.container.addFieldGroupItem()}>
      Add {props.container.config.targetClassLabel}
    </Button>}
  </>
}
