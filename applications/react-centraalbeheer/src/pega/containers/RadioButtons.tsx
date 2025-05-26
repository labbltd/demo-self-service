import { PContainer } from '@labb/dx-engine';
import RadioGroup from '../../design-system/cb-radio-group';

export default function RadioButtons(props: { container: PContainer }) {
  const { container } = props;
  function getValue(target: EventTarget | null): string {
    return (target as HTMLInputElement).value;
  }

  return <>
    <RadioGroup label={container.config.label}
      name={container.id}
      onChange={(e) =>
        props.container.updateFieldValue(getValue(e.target))
      }
      options={container.config.datasource}
      selectedValue={container.config.value}
    />
  </>
}
