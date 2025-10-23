import { Dropdown } from '@labb/dx-engine';
import { AutoComplete, Form } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import { useState } from 'react';

export default function DxAutocomplete(props: {
  container: Dropdown;
}): JSX.Element {
  const [items, setItems] = useState<BaseOptionType[]>([]);
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
        console.log(props.container.config.fieldMetadata)
        const parameters = (props.container.config.fieldMetadata as any)?.datasource.parameters;
        const dataPageParams = parameters.reduce((acc: any, param: any) => ({
          ...acc,
          [param.name]: param.value
        }), {} as { [key: string]: string });
        const response = await window.PCore.getDataApiUtils().getData<{ pyLocalizedValue: string, pyFieldValue: string }>(name, { dataViewParameters: dataPageParams });
        if (response.data?.data) {
          const items = response.data.data.map(item => ({
            label: item.pyLocalizedValue,
            value: item.pyFieldValue
          }))
          setItems(items);
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
      <AutoComplete
        id={props.container.id}
        value={props.container.config.value || undefined}
        status={props.container.config.validatemessage ? 'error' : ''}
        onClick={() => {
          setOptions();
        }}
        filterOption={(search, option) => {
          return option!['label'].includes(search)
        }}
        onSelect={(value) => {
          props.container.updateFieldValue(value)
          props.container.triggerFieldChange(value)
        }}
        disabled={props.container.config.readOnly}
        placeholder="Select..."
        style={{ width: '100%' }}
        options={items}
      >
      </AutoComplete>
    </Form.Item>
  );
}
