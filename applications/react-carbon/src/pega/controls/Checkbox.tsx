import { PContainer } from '@labb/dx-engine';
import { Checkbox } from '@carbon/react';

export default function DxCheckbox(props: { container: PContainer; }): JSX.Element {
  const {
    value,
    helperText,
    validatemessage,
    caption
  } = props.container.config;
  const id = props.container.getId();

  function onChange(checked: boolean): void {
    props.container.updateFieldValue(checked);
    props.container.triggerFieldChange(checked);
  }

  return <Checkbox
    checked={value}
    onChange={(e: any, t: {checked: boolean}) => onChange(t.checked)}
    helperText={helperText}
    id={id}
    invalid={!!validatemessage}
    invalidText={validatemessage}
    labelText={caption} />
}
