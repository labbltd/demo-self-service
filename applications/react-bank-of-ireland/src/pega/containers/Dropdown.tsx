import { PContainer } from '@labb/dx-engine';
import { BOISelect } from '../design-system/select';
import { PicklistProps } from '@labb/constellation-core-types';
import { useEffect, useState } from 'react';
import { BOISummaryItem } from '../design-system/summary';

export default function DxDropdown(props: { container: PContainer<PicklistProps> }) {
  if (props.container.config.readOnly) {
    return <BOISummaryItem label={props.container.config.label} value={props.container.config.value ?? '--'}/>;
  }

  const [options, setOptions] = useState(props.container.config.datasource);

  const datasourceName = (props.container.config as any).datasourceMetadata?.datasource.name;
  useEffect(() => {
    if (!options && datasourceName) {
      (async () => {
        const response = await window.PCore.getDataApiUtils().getData(datasourceName, { dataViewParameters: {} }, '')
        setOptions(response.data.data.map(d => ({ key: d.pyLocalizedValue, value: d.pyLocalizedValue })));
      })();
    }
  }, [datasourceName])

  return <BOISelect id={props.container.id}
    label={props.container.config.label}
    value={props.container.config.value}
    hint={props.container.config.helperText}
    select={value => {
      props.container.updateFieldValue(value);
      props.container.triggerFieldChange(value);
    }}
    options={options}
  />
}
