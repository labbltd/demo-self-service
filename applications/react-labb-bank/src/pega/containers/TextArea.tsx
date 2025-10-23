import { DefaultProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';
import { Input, Form } from 'antd';
import { ChangeEvent } from 'react';

const { TextArea: AntTextArea } = Input;

export default function TextArea(props: {
  container: PContainer<DefaultProps>;
}): JSX.Element {
  function getValue(event: ChangeEvent): string {
    return (event.target as HTMLTextAreaElement).value;
  }

  if (props.container.config.readOnly) {
    return (
      <Form.Item label={props.container.config.label}>
        <div dangerouslySetInnerHTML={{ __html: props.container.config.value }}></div>
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
      <AntTextArea
        id={props.container.id}
        value={props.container.config.value ?? ''}
        rows={10}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          props.container.updateFieldValue(getValue(e))
        }
        onBlur={(e: ChangeEvent<HTMLTextAreaElement>) =>
          props.container.triggerFieldChange(getValue(e))
        }
      />
    </Form.Item>
  );
}
