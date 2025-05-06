import { PContainer } from '@labb/dx-engine';
import CmCDropdown from '../../cmc-design/cmc-dropdown';
import CmCFormControl from '../../cmc-design/cmc-form-control';
import { useState } from 'react';

export default function DxDate(props: { container: PContainer }) {
  const [parts, setParts] = useState(props.container.config.value?.split('-'));
  function update(p: string[]) {
    setParts(p);
    const d = new Date(p.join('-'));
    if (d instanceof Date && !isNaN(d as unknown as number)) {
      props.container.updateFieldValue(p.join('-'))
      props.container.triggerFieldChange(p.join('-'))
    }
  }
  return <CmCFormControl
    label={props.container.config.label}
    helperText={props.container.config.helperText}
    errorMessage={props.container.config.validatemessage}
  >
    <div className="sc-dLMFU guDFfq">
      <CmCDropdown
        width="33.33%"
        options={Array.from(Array(31).keys()).map(v => ({ key: v + 1 + '', value: v + 1 + '' }))}
        value={parts[0]}
        errorMessage={props.container.config.validatemessage}
        selected={key => {
          update([key, parts[1], parts[2]]);
        }}
      />
      <CmCDropdown
        width="33.33%"
        options={[
          { key: '1', value: 'Jan' }, { key: '2', value: "Feb" }, { key: '3', value: "Mar" }, { key: '4', value: "Apr" }, { key: '5', value: "May" }, { key: '6', value: 'Jun' },
          { key: '7', value: "Jul" }, { key: '8', value: "Aug" }, { key: '9', value: "Sep" }, { key: '10', value: "Oct" }, { key: '11', value: "Nov" }, { key: '12', value: "Dev" }
        ]}
        value={parts[1]}
        errorMessage={props.container.config.validatemessage}
        selected={key => {
          update([parts[0], key, parts[2]]);
        }}
      />
      <CmCDropdown
        width="33.33%"
        options={Array.from(Array(100).keys()).map(v => ({ key: 2025 - v + '', value: 2025 - v + '' }))}
        value={parts[2]}
        errorMessage={props.container.config.validatemessage}
        selected={key => {
          update([parts[0], parts[1], key]);
        }}
      />
    </div>
  </CmCFormControl>
}
