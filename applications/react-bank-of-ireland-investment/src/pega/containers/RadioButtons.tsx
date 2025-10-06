import { PContainer } from '@labb/dx-engine';
import { BOIRadioButtons } from '../design-system/radio-buttons';

export default function RadioButtons(props: { container: PContainer }) {
  function getValue(target: EventTarget | null): string {
    return (target as HTMLInputElement).value;
  }

  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  }
  return (
    <BOIRadioButtons
      id={props.container.id}
      value={props.container.config.value}
      label={props.container.config.label}
      options={props.container.config.datasource}
      onChange={(e) =>
        props.container.updateFieldValue(getValue(e.target))
      }
      onBlur={(e) =>
        props.container.triggerFieldChange(getValue(e.target))
      } />
  );
}
