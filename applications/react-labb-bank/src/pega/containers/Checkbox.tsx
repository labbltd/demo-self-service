import { CheckboxProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';
import { Checkbox, Form } from 'antd';
import { CheckboxChangeEventTarget } from 'antd/es/checkbox/Checkbox';

export default function DxCheckbox(props: {
  container: PContainer<CheckboxProps>;
}): JSX.Element {
  function getValue(target: CheckboxChangeEventTarget): boolean {
    return target.checked;
  }

  if (props.container.config.readOnly) {
    return (
      <Form.Item label={props.container.config.caption}>
        <div>
          {props.container.config.value
            ? props.container.config.trueLabel
            : props.container.config.falseLabel}
        </div>
      </Form.Item>
    );
  }

  return (
    <Form.Item
      help={props.container.config.helperText}
      validateStatus={props.container.config.validatemessage ? 'error' : ''}
      extra={props.container.config.validatemessage}
    >
      <Checkbox
        checked={props.container.config.value ?? false}
        onChange={(e) => {
          props.container.updateFieldValue(getValue(e.target));
          props.container.triggerFieldChange(getValue(e.target));
        }}
      >
        {props.container.config.caption}
        {props.container.config.required && <span style={{ color: 'red' }}> *</span>}
      </Checkbox>
    </Form.Item>
  );
}
