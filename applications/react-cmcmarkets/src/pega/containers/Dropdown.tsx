import { PContainer } from '@labb/dx-engine';
import CmCDropdown from '../../cmc-design/cmc-dropdown';

export default function DxDropdown(props: { container: PContainer }) {
  return <CmCDropdown
    label={props.container.config.label}
    helperText={props.container.config.helperText}
    errorMessage={props.container.config.validatemessage}
    value={props.container.config.value}
    options={props.container.config.datasource}
    selected={(key: string) => {
      props.container.updateFieldValue(key);
      props.container.triggerFieldChange(key);
    }}/>
}
