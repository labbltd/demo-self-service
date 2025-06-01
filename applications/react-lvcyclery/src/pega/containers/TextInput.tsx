import { formatters, PContainer } from '@labb/dx-engine';
import LVCFormElement from 'applications/react-lvcyclery/design-system/lvc-form-element';
import LVCInput from 'applications/react-lvcyclery/design-system/lvc-input';
import { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react';

export default function DxTextInput(props: {
  container: PContainer;
}): JSX.Element {
  const [value, setValue] = useState<any>(props.container.config.value);
  const { container } = props;
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

  function format(value: any) {
    if (type() === 'date') return formatters.Date(value);
    if (type() === 'datetime-local') return formatters.DateTime(value);
    if (type() === 'time') return formatters.Time(value);
    if (type() === 'number' && props.container.config.currencyISOCode) return formatters.Currency(value);
    return value;
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

  if (container.config.readOnly) {
    // Show only the label and the selected location value (or fallback)
    return (
      <div className="paddingBottom1_v2sBX">
        <label
          className="label_dQA2Y marginBottomHalf_HqntJ regular_u61RY fontSize3_hUHe0"
          style={{ display: 'block', marginBottom: '0.25rem' }}
          htmlFor={container.config.label}
        >
          {container.config.label}
        </label>
        <div
          id={container.config.label}
          className="readonlyDisplay fontSizeInput_iB7ra paddingVerticalInput_wCTe9 paddingHorizontalInput_tn7be"
          aria-label={container.config.label}
        >
          {format(container.config.value) || '--'}
        </div>
      </div>
    );
  }

  return <LVCFormElement
    label={props.container.config.label}
    id={props.container.id}
    hint={props.container.config.helperText}
    error={props.container.config.validatemessage}
  >
    <LVCInput id={props.container.id}
      type={type()}
      invalid={props.container.config.validatemessage}
      value={value}
      onChange={v => change(v)}
      onBlur={v => blur(v)}
      readonly={props.container.config.readOnly}
    />
  </LVCFormElement>
}
