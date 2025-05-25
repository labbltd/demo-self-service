import { PContainer } from '@labb/dx-engine';

import {
  FormLabel
} from '@carbon/react';

interface DataItem {
  key: string;
  value: string;
}

interface ButtonGroupConfig {
  label: string;
  datasource: DataItem[];
  value: string;
  visibility: boolean;
}

export default function DxButtonGroup(props: { container: PContainer<ButtonGroupConfig> }): JSX.Element {
  const { label, value, datasource } = props.container.config;

  function selected(item: DataItem): void {
    props.container.updateFieldValue(item.key);
    props.container.triggerFieldChange(item.key);
  }

  return (
    <FormLabel>
      {label}
      <div className='btn-group'>
        {datasource.map(item => (
          <button
            key={item.key}
            onClick={() => selected(item)}
            className={`cds--btn cds--btn--field ${item.key === value ? 'cds--btn--secondary' : ''}`}>
            {item.value}
          </button>
        ))}
      </div>
    </FormLabel>
  );
}
