import { PContainer } from '@labb/dx-engine';

export default function Checkbox(props: {
  container: PContainer;
}): JSX.Element {
  const { caption, required, helperText, validatemessage } = props.container.config;
  const id = props.container.getId();

  return (
    <div className="govuk-checkboxes__item">
      <input className="govuk-checkboxes__input" id={id} name={id} type="checkbox" value={caption} />
      <label className="govuk-label govuk-checkboxes__label" htmlFor={id}>
        {caption}
      </label>
    </div>
  );
}
