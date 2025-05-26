import { PContainer } from '@labb/dx-engine';

export default function Checkbox(props: {
  container: PContainer;
}): JSX.Element {
  const { container } = props;
  const id = props.container.getId();

  if (props.container.config.readOnly) {
    return <div className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key">
        {props.container.config.caption}
      </dt>
      <dd className="govuk-summary-list__value">
        {props.container.config.value ? props.container.config.trueLabel : props.container.config.falseLabel}
      </dd>
    </div>
  }

  return (
    <div className="govuk-checkboxes__item">
      <input className="govuk-checkboxes__input" id={id} name={id} type="checkbox" checked={container.config.value ?? false} onChange={e => {
        container.updateFieldValue(e.target.checked);
        container.triggerFieldChange(e.target.checked);
      }} />
      <label className="govuk-label govuk-checkboxes__label" htmlFor={id}>
        {container.config.caption}
      </label>
    </div>
  );
}
