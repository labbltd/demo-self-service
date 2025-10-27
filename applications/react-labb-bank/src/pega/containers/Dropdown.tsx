import { Dropdown } from '@labb/dx-engine';
import { Form, Select } from 'antd';

export default function DxDropdown(props: {
  container: Dropdown;
}): JSX.Element {
  if (props.container.config.readOnly) {
    return (
      <Form.Item label={props.container.config.label}>
        <div>{props.container.config.value ?? '--'}</div>
      </Form.Item>
    );
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
        onChange={(value) => {
          props.container.updateFieldValue(value);
          props.container.triggerFieldChange(props.container.config.value)
        }}
        disabled={props.container.config.readOnly}
        placeholder="Select..."
        style={{ width: '100%' }}
      >
        {props.container.listItems.map(
          (option) => (
            <Select.Option key={option.key} value={option.key}>
              {option.value}
            </Select.Option>
          )
        )}
      </Select>
    </Form.Item >
  );
}
