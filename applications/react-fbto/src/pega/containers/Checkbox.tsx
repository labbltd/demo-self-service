import { PContainer } from '@labb/dx-engine';

export default function Checkbox(props: {
  container: PContainer;
}): JSX.Element {
  function getValue(target: EventTarget & HTMLInputElement): boolean {
    return target.checked;
  }
  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.caption}</dt><dd>{props.container.config.value ? props.container.config.trueLabel : props.container.config.falseLabel}</dd></>;
  }

  return <>
    <label>
      {props.container.config.required ? ' *' : ''}
      <input
        type="checkbox"
        onChange={(e) => {
          props.container.updateFieldValue(getValue(e.target))
          props.container.triggerFieldChange(getValue(e.target))
        }}
      />
      {props.container.config.caption}
    </label>
    {props.container.config.helperText}
    {props.container.config.validatemessage}
  </>;
}
