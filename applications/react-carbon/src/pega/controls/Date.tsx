import { PContainer } from '@labb/dx-engine';
import {
  DatePicker, DatePickerInput
} from '@carbon/react';

export default function Date(props: {
  container: PContainer;
}): JSX.Element {
  const { label, validatemessage, helperText } = props.container.config;
  const id = props.container.getId();

  function onChange(dates: Date[]): void {
    props.container.updateFieldValue(dates[0].toISOString());
    props.container.triggerFieldChange(dates[0].toISOString());
  }

  return (
    <DatePicker datePickerType="single" onChange={onChange}>
      <DatePickerInput
        id={id}
        labelText={label}
        placeholder="mm/dd/yyyy"
        invalid={!!validatemessage}
        invalidText={validatemessage}
        helperText={helperText}
        size="lg"
      />
    </DatePicker>
  );
}
