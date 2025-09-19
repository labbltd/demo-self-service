import { PContainer } from '@labb/dx-engine';
import CmCDropdown from '../../cmc-design/cmc-dropdown';
import CmCFormControl from '../../cmc-design/cmc-form-control';

export default function DxDropdown(props: { container: PContainer }) {
  return <CmCFormControl
    label={props.container.config.label}
    helperText={props.container.config.helperText}>
    <CmCDropdown
      errorMessage={props.container.config.validatemessage}
      value={props.container.config.value}
      options={props.container.config.datasource}
      flagged={['Nationality', 'Country of birth','Country'].includes(props.container.config.label)}
      selected={(key: string) => {
        props.container.updateFieldValue(key);
        props.container.triggerFieldChange(key);
      }} />
  </CmCFormControl>
}
