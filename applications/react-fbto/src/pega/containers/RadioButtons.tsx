import { PContainer } from '@labb/dx-engine';

export default function RadioButtons(props: { container: PContainer }) {
  function getValue(target: EventTarget | null): string {
    return (target as HTMLInputElement).value;
  }

  return (
    <fieldset>
      <legend>
        {props.container.config.label}
        {props.container.config.required ? ' *' : ''}
      </legend>
      {props.container.config.datasource.map(
        (option: { key: string; value: string }) => (
          <label key={option.key}>
            <input
              type="radio"
              onChange={(e) =>
                props.container.updateFieldValue(getValue(e.target))
              }
              onBlur={(e) =>
                props.container.triggerFieldChange(getValue(e.target))
              }
              checked={props.container.config.value === option.key}
              name={props.container.id}
              id={`${props.container.id}.${option.key}`}
              value={option.key}
              readOnly={props.container.config.readOnly}
              disabled={props.container.config.readOnly}
            />{' '}
            {option.value}
          </label>
        )
      )}
      {props.container.config.helperText}
      {props.container.config.validatemessage}
    </fieldset>
  );
}
