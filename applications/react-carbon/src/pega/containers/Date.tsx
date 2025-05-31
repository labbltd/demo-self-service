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
  
  return (
    <DatePicker datePickerType="single" onChange={onChange}>
      <DatePickerInput
        id={id}
        labelText={container.config.label}
        placeholder="mm/dd/yyyy"
        value={container.config.value}
        invalid={!!container.config.validatemessage}
        invalidText={container.config.validatemessage}
        helperText={container.config.helperText}
        size="lg"
      />
    </DatePicker>
  );
}
