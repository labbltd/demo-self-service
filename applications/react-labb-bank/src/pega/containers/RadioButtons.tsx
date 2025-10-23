import { PicklistProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';
import { Radio, Form } from 'antd';
import { RadioChangeEventTarget } from 'antd/es/radio';

export default function RadioButtons(props: {
  container: PContainer<PicklistProps>;
}): JSX.Element {
  function getValue(target: RadioChangeEventTarget): string {
    return target.value;
  }

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
      <Radio.Group
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
        value={props.container.config.value}
        onChange={(e) => {
          props.container.updateFieldValue(getValue(e.target));
          props.container.triggerFieldChange(getValue(e.target));
        }}
      >
        {props.container.config.datasource?.map(
          (option: { key: string; value: string }) => (
            <Radio key={option.key} value={option.key}>
              {option.value}
            </Radio>
          )
        )}
      </Radio.Group>
    </Form.Item>
  );
}
