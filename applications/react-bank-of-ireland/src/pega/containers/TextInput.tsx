import { formatters, PContainer } from '@labb/dx-engine';
import { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react';
import { BOITextInput } from '../design-system/text-input';
import { BOISummaryItem } from '../design-system/summary';

export default function TextInput(props: {
  container: PContainer;
}): JSX.Element {
  const [value, setValue] = useState<any>(props.container.config.value);

  function type(): HTMLInputTypeAttribute {
    switch (props.container.config.fieldMetadata?.type) {
      case 'Decimal':
        return 'number';
      case 'Integer':
        return 'number';
      case 'True-False':
        return 'checkbox';
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
          default:
            return 'text';
        }
      default:
        return 'text';
    }
  }

  function inputmode():
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
    | undefined {
    switch (props.container.config.fieldMetadata?.type) {
      case 'Decimal':
        return 'decimal';
      case 'Percentage':
        return 'decimal';
      case 'Integer':
        return 'numeric';
      default:
        return undefined;
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

  function getValue(
    target: EventTarget | null
  ): number | boolean | string | null {
    const t: HTMLInputElement = target as HTMLInputElement;
    switch (type()) {
      case 'number':
        return t.valueAsNumber;
      case 'date':
        return t.valueAsDate?.toISOString().split('T')[0] || '';
      case 'checkbox':
        return t.checked;
      default:
        return t.value;
    }
  }

  function change(event: ChangeEvent<HTMLInputElement>) {
    if (type() !== 'date') {
      props.container.updateFieldValue(getValue(event.target))
    }
    setValue(getValue(event.target));
  }

  function blur(event: ChangeEvent<HTMLInputElement>) {
    if (type() === 'date') {
      props.container.updateFieldValue(getValue(event.target))
    }
    props.container.triggerFieldChange(getValue(event.target))
  }

  function format(value: any) {
    if (type() === 'date') return formatters.Date(value);
    if (type() === 'datetime-local') return formatters.DateTime(value);
    if (type() === 'time') return formatters.Time(value);
    if (type() === 'number' && props.container.config.currencyISOCode) return formatters.Currency(value);
    return value;
  }

  props.container.updates.subscribe(() => {
    setValue(props.container.config.value);
  })

  if (props.container.config.readOnly) {
    return <BOISummaryItem label={props.container.config.label} value={format(props.container.config.value) ?? '--'} />;
  }
  return <BOITextInput id={props.container.id}
    label={props.container.config.label}
    hint={props.container.config.helpText}
    placeholder={props.container.config.placeholder}
    errorMessage={props.container.config.validatemessage}
    prefix={props.container.config.fieldMetadata?.displayAs === 'pxCurrency' ? '€' : undefined}
    type={type()}
    inputMode={inputmode()}
    step={step()}
    value={value}
    disabled={props.container.config.disabled}
    onChange={e => change(e)}
    onBlur={e => blur(e)}
  />;
}
