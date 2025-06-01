import {
  DatePicker, DatePickerInput
} from '@carbon/react';
import { PContainer } from '@labb/dx-engine';

export default function Date(props: {
  container: PContainer;
}): JSX.Element {
  const { container } = props;
  const id = props.container.getId();

  function onChange(dates: Date[]): void {
    const val = dates[0].toISOString().split('T')[0];
    props.container.updateFieldValue(val);
    props.container.triggerFieldChange(val);
  }

  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  }

  function toDatePickerFormat(value: string): string {
    if (!value) return value;
    const dateParts = value.split('-');
    return [dateParts[1], dateParts[2], dateParts[0]].join('/');
  }

  return (
    <DatePicker datePickerType="single"
      dateFormat={'m/d/Y'}
      onChange={onChange}
      value={toDatePickerFormat(container.config.value)}>
      <DatePickerInput
        id={id}
        labelText={container.config.label}
        placeholder="mm/dd/yyyy"
        invalid={!!container.config.validatemessage}
        invalidText={container.config.validatemessage}
        helperText={container.config.helperText}
        size="lg"
      />
    </DatePicker>
  );
}
