import { PContainer } from '@labb/dx-engine';
import CmCRadio from '../../cmc-design/cmc-radio';
import CmCCheckbox from '../../cmc-design/cmc-checkbox';

export default function Checkbox(props: {
  container: PContainer;
}): JSX.Element {
  return ['I understand', 'I agree', 'I would like'].find(v => props.container.config.caption.startsWith(v)) &&
    <CmCCheckbox
      label={props.container.config.caption}
      errorMessage={props.container.config.validatemessage}
      checked={props.container.config.value}
      toggled={(checked: boolean) => {
        props.container.updateFieldValue(checked);
        props.container.triggerFieldChange(checked);
      }} /> ||
    <CmCRadio
      label={props.container.config.caption}
      options={[
        { key: 'true', value: props.container.config.trueLabel },
        { key: 'false', value: props.container.config.falseLabel }
      ]}
      value={props.container.config.value ? 'true' : 'false'}
      helperText={props.container.config.helperText}
      errorMessage={props.container.config.validatemessage}
      selected={(key: string) => {
        props.container.updateFieldValue(key === 'true');
        props.container.triggerFieldChange(key === 'true');
      }}
    />
}
