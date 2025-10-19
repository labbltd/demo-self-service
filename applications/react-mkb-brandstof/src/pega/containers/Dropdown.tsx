import { PContainer } from '@labb/dx-engine';
import { useState } from 'react';

export default function DxDropdown(props: { container: PContainer }) {
  const [open, setOpen] = useState(false);
  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  }
  return <>
    <fieldset>
      <div className="selectize-control single">
        <label>
          {props.container.config.label}
        </label>
        <div className="selectize-input" onClick={() => { setOpen(!open) }}>
          <div>{props.container.config.value}</div>
        </div>
        {open && <div className="selectize-dropdown">
          <div className="selectize-dropdown-content">
            {props.container.config.datasource.map(
              (option: { key: string; value: string }) => (
                <div key={option.key} data-selectable data-value={option.value} onClick={() => {
                  props.container.updateFieldValue(option.key);
                  props.container.triggerFieldChange(option.key);
                  setOpen(false);
                }}>
                  {option.value}
                </div>
              )
            )}
          </div>
        </div>}
      </div>
      {props.container.config.validatemessage && <span data-errorfield-id="phonenumber" className="error-message">{props.container.config.validatemessage}</span>}
    </fieldset>
  </>
}
