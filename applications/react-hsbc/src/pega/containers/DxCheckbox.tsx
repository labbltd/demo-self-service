import { PContainer } from '@labb/dx-engine';
import HsbcCheckbox from '../../../design-system/hsbc-checkbox';
import HsbcFormElement from '../../../design-system/hsbc-form-element';

export default function DxCheckbox(props: {
  container: PContainer;
}): JSX.Element {
  return (
    <HsbcFormElement id={props.container.id}
      hint={props.container.config.helperText}
      error={props.container.config.validatemessage}>
      <HsbcCheckbox id={props.container.id}
        label={props.container.config.caption}
        value={props.container.config.value}
        onChange={v => props.container.updateFieldValue(v)}
      />
    </HsbcFormElement>
  );
}
