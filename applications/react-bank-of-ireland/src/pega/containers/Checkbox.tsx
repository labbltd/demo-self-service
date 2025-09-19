import { CheckboxProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';
import { BOICheckbox } from '../design-system/checkbox';
import { BOISummaryItem } from '../design-system/summary';

export default function Checkbox(props: {
  container: PContainer<CheckboxProps>;
}): JSX.Element {
  function getValue(target: EventTarget & HTMLInputElement): boolean {
    return target.checked;
  }

  function format(value: boolean): string {
    return value ? props.container.config.trueLabel : props.container.config.falseLabel;
  }

  if (props.container.config.readOnly) {
    return <BOISummaryItem label={props.container.config.caption} value={format(props.container.config.value) ?? '--'} />;
  }

  return <>
    <BOICheckbox
      label={props.container.config.label}
      caption={props.container.config.caption}
      errorMessage={props.container.config.validatemessage}
      checked={props.container.config.value ?? false}
      onChange={(e) => {
        props.container.updateFieldValue(getValue(e.target));
        props.container.triggerFieldChange(getValue(e.target));
      }}
    />
    {props.container.config.validatemessage && <em>{props.container.config.validatemessage}</em>}
  </>;
}
