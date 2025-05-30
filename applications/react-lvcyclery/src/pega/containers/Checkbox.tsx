import { PContainer } from '@labb/dx-engine';
import LVCCheckbox from '../../../design-system/lvc-checkbox';
import LVCFormElement from '../../../design-system/lvc-form-element';

export default function DxCheckbox(props: {
  container: PContainer;
}): JSX.Element {
  return (
    <LVCFormElement id={props.container.id}
      hint={props.container.config.helperText}
      error={props.container.config.validatemessage}>
      <LVCCheckbox id={props.container.id}
        label={props.container.config.caption}
        value={props.container.config.value}
        readonly={props.container.config.readOnly}
        onChange={v => props.container.updateFieldValue(v)}
      />
    </LVCFormElement>
  );
}
