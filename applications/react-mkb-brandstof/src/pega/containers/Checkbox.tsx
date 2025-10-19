import { CheckboxProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';
import { Checkbox } from '../../design-system/design';

export default function DxCheckbox(props: {
  container: PContainer<CheckboxProps>;
}): JSX.Element {
  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.caption}</dt><dd>{props.container.config.value ? props.container.config.trueLabel : props.container.config.falseLabel}</dd></>;
  }

  return <>
    <Checkbox
      id={props.container.id}
      name={props.container.id}
      label={props.container.config.caption}
      checked={props.container.config.value ?? false}
      onChange={(e) => {
        props.container.updateFieldValue(e);
        props.container.triggerFieldChange(e);
      }}
    ></Checkbox>
    {props.container.config.helperText && <span data-tooltip={props.container.config.helperText}>(?)</span>}
    {props.container.config.validatemessage && <em>{props.container.config.validatemessage}</em>}
  </>;
}
