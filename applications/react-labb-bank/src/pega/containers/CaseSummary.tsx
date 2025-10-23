import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { formatters, PContainer } from '@labb/dx-engine';
import { Card, Descriptions, Divider } from 'antd';
import { useState } from 'react';

export default function CaseSummary(props: { container: PContainer }) {
  const [open, setOpen] = useState<boolean>(false);

  function format(container: PContainer) {
    switch (container.pconnect.getComponentName()) {
      case 'TextInput': return container.config.value;
      case 'Decimal': return formatters.Decimal(container.config.value, {decPlaces: 0});
      case 'DateTime': return formatters.DateTime(container.config.value);
      case 'Date': return formatters.Date(container.config.value);
      case 'Time': return formatters.Time(container.config.value);
      case 'Currency': return formatters.Currency(container.config.value);
      case 'UserReference': return container.config.value.name;
      default: return null;
    }
  }

  const items = props.container.children.map((fields, index) => fields.children
    .filter(field => field.config.visibility !== false)
    .map(field => ({
      label: field.config.label,
      children: format(field),
      span: 'filled'
    } as { label: string, children: any, span: 'filled' }))
  );
  return <Card style={{ marginBottom: '10px', backgroundColor: 'ButtonText' }} actions={open ? [
    <UpOutlined onClick={() => setOpen(false)} />] : [
    <DownOutlined onClick={() => setOpen(true)} />
  ]}>
    <Descriptions layout='horizontal' items={items[0]} style={{ width: '100%' }} />
    {open && <>
      <Divider />
      <Descriptions layout='vertical' items={items[1]} style={{ width: '100%' }} ></Descriptions>
    </>}
  </Card>
}
