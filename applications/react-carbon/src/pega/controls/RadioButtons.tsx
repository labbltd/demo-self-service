import { PContainer } from '@labb/dx-engine';
import {
  RadioButtonGroup, RadioButton
} from '@carbon/react';

export default function RadioButtons(props: { container: PContainer }) {
  return (
    <div style={{marginTop: '10px'}}>
    <RadioButtonGroup
      legendText={props.container.config.label}
      defaultSelected={props.container.config.value}
      name={props.container.getId()}
      helperText={props.container.config.helperText}
      invalid={!!props.container.config.validatemessage}
      invalidText={props.container.config.validatemessage}>
      {props.container.config.datasource.map(
        (option: { key: string; value: string }) => (
          <RadioButton labelText={option.value}
            onClick={() =>
              props.container.updateFieldValue(option.key)
            }
            onBlur={() =>
              props.container.triggerFieldChange(option.key)
            }
            value={option.key}
            key={option.key}
            id={option.key} />
        )
      )}
    </RadioButtonGroup>
    </div>
  );
}
