import { formatters, PContainer } from '@labb/dx-engine';
import { DatePicker, Form, Input, InputNumber } from 'antd';
import { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react';
import dayjs from 'dayjs';

export default function TextInput(props: {
  container: PContainer;
}): JSX.Element {
  function type(): HTMLInputTypeAttribute {
    switch (props.container.config.fieldMetadata?.type) {
      case 'Decimal':
        return 'number';
      case 'Integer':
        return 'number';
      case 'Date Time':
        return 'datetime-local';
      case 'Date':
        return 'date';
      case 'TimeOfDay':
        return 'time';
      case 'Text':
        switch (props.container.config.fieldMetadata?.displayAs) {
          case 'pxEmail':
            return 'email';
          case 'pxPhone':
            return 'tel';
          default:
            return 'text';
        }
      default:
        return 'text';
    }
  }

  function step(): string | number | undefined {
    switch (props.container.config.fieldMetadata?.type) {
      case 'Decimal':
      case 'Percentage':
        return '0.' + '1'.padStart(props.container.config.precision ?? 2, '0');
      case 'Integer':
        return 1;
      default:
        return undefined;
    }
  }

  function getValue(target: EventTarget | null): number | string | null {
    const t: HTMLInputElement = target as HTMLInputElement;
    switch (type()) {
      case 'number':
        return t.valueAsNumber;
      case 'date':
        return t.valueAsDate?.toISOString().split('T')[0] || '';
      default:
        return t.value;
    }
  }

  function format(value: any) {
    if (type() === 'date') return formatters.Date(value);
    if (type() === 'datetime-local') return formatters.DateTime(value);
    if (type() === 'time') return formatters.Time(value);
    if (type() === 'number' && props.container.config.currencyISOCode)
      return formatters.Currency(value);
    return value;
  }

  if (props.container.config.readOnly) {
    return (
      <Form.Item label={props.container.config.label}>
        <div>{format(props.container.config.value) ?? '--'}</div>
      </Form.Item>
    );
  }

  const inputType = type();
  const isNumberInput = inputType === 'number';
  const isDateInput = inputType === 'date';

  return (
    <Form.Item
      label={props.container.config.label}
      required={props.container.config.required}
      help={<span dangerouslySetInnerHTML={{ __html: props.container.config.helperText }}></span>}
      validateStatus={props.container.config.validatemessage ? 'error' : ''}
      extra={props.container.config.validatemessage}
    >
      {isNumberInput ? (
        <InputNumber
          id={props.container.id}
          value={props.container.config.value ?? ''}
          disabled={props.container.config.disabled}
          status={props.container.config.validatemessage ? 'error' : ''}
          step={step()}
          onChange={(val) => props.container.updateFieldValue(val)}
          onBlur={(e) => props.container.triggerFieldChange(e.target.valueAsNumber)}
          style={{ width: '100%' }}
        />
      ) : isDateInput ? (
        <DatePicker
          format={'MM/DD/YYYY'}
          value={dayjs(props.container.config.value).isValid() ? dayjs(props.container.config.value) : null}
          status={props.container.config.validatemessage ? 'error' : ''}
          onChange={(_, date) => {
            props.container.updateFieldValue(date);
          }}
          onBlur={() => {
            props.container.triggerFieldChange(props.container.config.value);
          }}
          style={{ width: '100%' }}
        />
      ) : (
        <Input
          id={props.container.id}
          type={inputType}
          status={props.container.config.validatemessage ? 'error' : ''}
          value={props.container.config.value ?? ''}
          disabled={props.container.config.disabled}
          onChange={e => props.container.updateFieldValue(e.target.value)}
          onBlur={e  => props.container.triggerFieldChange(e.target.value)}
        />
      )}
    </Form.Item>
  );
}
