import { Checkbox } from '@carbon/react';
import { PContainer } from '@labb/dx-engine';

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

  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.caption}</dt><dd>{props.container.config.value ? props.container.config.trueLabel : props.container.config.falseLabel}</dd></>;
  }

  return <Checkbox
    checked={value}
    onChange={(e: any, t: { checked: boolean }) => onChange(t.checked)}
    helperText={helperText}
    id={id}
    invalid={!!validatemessage}
    invalidText={validatemessage}
    labelText={caption} />
}
