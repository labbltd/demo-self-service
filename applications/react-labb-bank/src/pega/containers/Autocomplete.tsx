import { Dropdown } from '@labb/dx-engine';
import { AutoComplete, Form } from 'antd';
import { useState } from 'react';

export default function DxAutocomplete(props: {
  container: Dropdown;
}): JSX.Element {
  const [items, setItems] = useState<{ label: string, value: string }[]>([]);
  const [value, setValue] = useState<string>('');
  console.log(items, value);
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
          const matchedItem = items.find(item => item.value === value)?.label;
          if (matchedItem) {
            setValue(matchedItem);
          }
        }
      }
    }
  }

  function matches(item: string, search: string) {
    const normalizedItem = item.trim().toLowerCase();
    const normalizedSearch = search.trim().toLowerCase();
    return normalizedSearch.split('').reduce((idx, letter) =>
      idx === -1 ? idx : normalizedItem.split('').indexOf(letter, idx == -2 ? 0 : idx + 1),
      -2
    ) >= 0;
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
        value={value}
        status={props.container.config.validatemessage ? 'error' : ''}
        onClick={() => {
          setOptions();
        }}
        filterOption={(search, option) => {
          return matches(option!.label, search)
        }}
        onSelect={(value) => {
          props.container.updateFieldValue(value);
          props.container.triggerFieldChange(value);
        }}
        onChange={val => {
          setValue(val)
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
