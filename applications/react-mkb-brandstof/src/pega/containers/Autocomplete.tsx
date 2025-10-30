import { Dropdown } from '@labb/dx-engine';
import { useState } from 'react';

export default function DxAutocomplete(props: {
  container: Dropdown;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<{ label: string, value: string }[]>([]);
  const [value, setValue] = useState<string>('');

  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
  }

  async function setOptions() {
    if (items.length === 0) {
      const name = (props.container.config.fieldMetadata as any)?.datasource?.name || props.container.config.datasource;
      if (name) {
        console.log(props.container.config.fieldMetadata)
        const parameters = (props.container.config.fieldMetadata as any)?.datasource?.parameters || [];
        const dataPageParams = parameters.reduce((acc: any, param: any) => ({
          ...acc,
          [param.name]: param.value
        }), {} as { [key: string]: string });
        const response = await window.PCore.getDataApiUtils().getData<{ pyLocalizedValue: string, pyFieldValue: string }>(name, { dataViewParameters: dataPageParams });
        if (response.data?.data) {
          const cols = props.container.config.columns;
          if (cols) {
            const items = response.data.data.map((item: { [key: string]: string }) => ({
              label: item[cols.find(col => col.display === 'true').value.replace('\.', '')],
              value: item[cols.find(col => col.key === 'true').value.replace('\.', '')]
            }))
            setItems(items);
          } else {
            const items = response.data.data.map(item => ({
              label: item.pyLocalizedValue,
              value: item.pyFieldValue
            }))
            setItems(items);
          }
          const matchedItem = items.find(item => item.value === value)?.label;
          if (matchedItem) {
            setValue(matchedItem);
          }
        }
      }
    }
  }

  function matches(item: string, search: string) {
    const normalizedItem = item.trim().toLowerCase();
    const normalizedSearch = search.trim().toLowerCase();
    return normalizedSearch.split('').reduce((idx, letter) =>
      idx === -1 ? idx : normalizedItem.split('').indexOf(letter, idx == -2 ? 0 : idx + 1),
      -2
    ) >= 0;
  }

  return (
    <fieldset>
      <div className="selectize-control single">
        <label>
          {props.container.config.label}
        </label>
        <div className="selectize-input" onClick={async () => {
          setOptions();
          setOpen(!open);
        }}>
          <div>{items.find(item => item.value === props.container.config.value)?.label}</div>
        </div>
        {open && <div className="selectize-dropdown">
          <div className="selectize-dropdown-content">
            {items.map(
              (option: { label: string; value: string }) => (
                <div key={option.value} data-selectable onClick={() => {
                  props.container.updateFieldValue(option.value);
                  props.container.triggerFieldChange(option.value);
                  setOpen(false);
                }}>
                  {option.label}
                </div>
              )
            )}
          </div>
        </div>}
      </div>
      {props.container.config.validatemessage && <span data-errorfield-id="phonenumber" className="error-message">{props.container.config.validatemessage}</span>}
    </fieldset>
    // <Form.Item
    //   label={props.container.config.label}
    //   required={props.container.config.required}
    //   help={props.container.config.helperText}
    //   validateStatus={props.container.config.validatemessage ? 'error' : ''}
    //   extra={props.container.config.validatemessage}
    // >
    //   <AutoComplete
    //     id={props.container.id}
    //     value={value}
    //     status={props.container.config.validatemessage ? 'error' : ''}
    //     onClick={() => {
    //       setOptions();
    //     }}
    //     filterOption={(search, option) => {
    //       return matches(option!.label, search)
    //     }}
    //     onSelect={(value) => {
    //       props.container.updateFieldValue(value);
    //       props.container.triggerFieldChange(value);
    //       const matchedItem = items.find(item => item.value === value)?.label;
    //       if (matchedItem) {
    //         setValue(matchedItem);
    //       }
    //     }}
    //     onChange={val => {
    //       setValue(val)
    //     }}
    //     disabled={props.container.config.readOnly}
    //     placeholder="Select..."
    //     style={{ width: '100%' }}
    //     options={items}
    //   >
    //   </AutoComplete>
    // </Form.Item>
  );
}
