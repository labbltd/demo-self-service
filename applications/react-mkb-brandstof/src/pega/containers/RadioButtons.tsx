import { PContainer } from '@labb/dx-engine';
import { RadioGroup } from '../../design-system/design';

export default function RadioButtons(props: { container: PContainer }) {
  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  }
  return (<>
    <RadioGroup
      legend={props.container.config.label}
      required={props.container.config.required}
      name={props.container.id}
      options={props.container.config.datasource}
      value={props.container.config.value}
      error={props.container.config.validatemessage}
      onChange={(e) => {
        props.container.updateFieldValue(e);
        props.container.triggerFieldChange(e);
      }}
    />
  </>
  );
}
