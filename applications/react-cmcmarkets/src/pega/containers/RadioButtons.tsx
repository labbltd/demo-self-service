import { PContainer } from '@labb/dx-engine';
import CmCRadio from '../../cmc-design/cmc-radio';

export default function DxRadioButtons(props: { container: PContainer }) {
  return <CmCRadio
      label={props.container.config.label}
      options={props.container.config.datasource}
      value={props.container.config.value}
      helperText={props.container.config.helperText}
      errorMessage={props.container.config.validatemessage}
      selected={key => {
        props.container.updateFieldValue(key);
        props.container.triggerFieldChange(key);
      }}
    />
}
