import { CheckboxProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';
import { Checkbox } from '../../design-system/design';

export default function DxCheckbox(props: {
  container: PContainer<CheckboxProps>;
}): JSX.Element {
  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.caption}</dt><dd>{props.container.config.value ? props.container.config.trueLabel : props.container.config.falseLabel}</dd>
    </>;
  }

  const isEuropeFueling = props.container.pconnect.getStateProps().value === '.AddEuropeRefueling';

  if (isEuropeFueling) {
    return <div>
      <label htmlFor="europe" className="f-item__label europe-fuelling-intro">
        <strong>{(props.container.config.fieldMetadata as any)?.label}</strong>
      </label>
      <div className="f-item europe-fuelling">
        <div className="f-element-radio europe-fuelling__item">
          <input name="europe" id="europe" type="checkbox"
            checked={props.container.config.value}
            onChange={(e) => {
              props.container.updateFieldValue(e.target.checked);
              props.container.triggerFieldChange(e.target.checked);
            }} />
          <label htmlFor="europe" className="f-element-radio__label--full-width europe-fuelling__label">
            <div className="europe-fuelling__label__content">
              <span className="europe-fuelling__label__content__title">{props.container.config.caption}</span>
              <p>
                {props.container.config.helperText}
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
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
    >
    </Checkbox>
    {props.container.config.helperText && <span data-tooltip={props.container.config.helperText}>(?)</span>}
    {props.container.config.validatemessage && <em>{props.container.config.validatemessage}</em>}
  </>;
}
