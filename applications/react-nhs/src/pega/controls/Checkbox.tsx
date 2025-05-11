import { PContainer } from '@labb/dx-engine';

export default function Checkbox(props: {
  container: PContainer;
}): JSX.Element {
  const { caption, label, required, helperText, validatemessage } = props.container.config;
  const id = props.container.getId();

  function onChange(val: boolean) {
    props.container.updateFieldValue(val);
    props.container.triggerFieldChange(val);
  }

  return (
    <div className="nhsuk-checkboxes__item">
      {label}
      <input className="nhsuk-checkboxes__input" id={id} name={id} type="checkbox" value={caption} onChange={(e) => onChange(e.target.checked)} />
      <label className="nhsuk-label nhsuk-checkboxes__label" htmlFor={id}>
        {caption}
      </label>
    </div>
  );
}
