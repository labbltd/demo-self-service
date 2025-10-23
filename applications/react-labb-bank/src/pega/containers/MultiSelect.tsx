import { Multiselect } from '@labb/dx-engine';
import { Checkbox, Input, Form, Space } from 'antd';
import { ChangeEvent, useState } from 'react';

export default function MultiSelect(props: {
  container: Multiselect;
}): JSX.Element {
  const [searchValue, setSearchValue] = useState('');
  const { container } = props;

  function search(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearchValue(value);
    container.onSearchHandler(value);
  }

  return (
    <Form.Item
      label={container.config.label}
      help={container.config.helperText}
      validateStatus={container.config.validatemessage ? 'error' : ''}
      extra={container.config.validatemessage}
    >
      <Input
        type="text"
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => search(e)}
        placeholder="Search..."
      />
      <Space direction="vertical" style={{ marginTop: 12 }}>
        {container.itemsTree.map((item) => (
          <Checkbox
            key={item.id}
            checked={item.selected}
            onChange={() => container.toggleItem(item.id!)}
          >
            {item.primary}
          </Checkbox>
        ))}
      </Space>
    </Form.Item>
  );
}
