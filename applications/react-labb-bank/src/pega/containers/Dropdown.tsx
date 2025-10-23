import { Dropdown } from '@labb/dx-engine';
import { Form, Select } from 'antd';
import { useEffect, useState } from 'react';

export default function DxDropdown(props: {
  container: Dropdown;
}): JSX.Element {
  const [items, setItems] = useState(props.container.listItems || []);
  if (props.container.config.readOnly) {
    return (
      <Form.Item label={props.container.config.label}>
        <div>{props.container.config.value ?? '--'}</div>
      </Form.Item>
    );
  }

  async function setOptions() {
    if (items.length === 0) {
      const name = (props.container.config.fieldMetadata as any)?.datasource?.name;
      if (name) {
        const parameters = (props.container.config.fieldMetadata as any)?.datasource.parameters;
        const dataPageParams = parameters.reduce((acc: any, param: any) => ({
          ...acc,
          [param.name]: param.value
        }), {} as { [key: string]: string });
        const response = await window.PCore.getDataApiUtils().getData<{ pyLocalizedValue: string, pyFieldValue: string }>(name, { dataViewParameters: dataPageParams });
        if (response.data?.data) {
          setItems(response.data.data.map(item => ({
            key: item.pyLocalizedValue,
            value: item.pyFieldValue
          })));
        }
      }
    }
  }

  return (
    <Form.Item
      label={props.container.config.label}
      required={props.container.config.required}
      help={props.container.config.helperText}
      validateStatus={props.container.config.validatemessage ? 'error' : ''}
      extra={props.container.config.validatemessage}
    >
      <Select
        id={props.container.id}
        value={props.container.config.value || undefined}
        status={props.container.config.validatemessage ? 'error' : ''}
        onClick={() => setOptions()}
        onChange={(value) => props.container.updateFieldValue(value)}
        onBlur={() => props.container.triggerFieldChange(props.container.config.value)}
        disabled={props.container.config.readOnly}
        placeholder="Select..."
        style={{ width: '100%' }}
      >
        {items.map(
          (option) => (
            <Select.Option key={option.key} value={option.key}>
              {option.value}
            </Select.Option>
          )
        )}
      </Select>
    </Form.Item>
  );
}
