import { PContainer } from '@labb/dx-engine';
import LVCCheckbox from '../../../design-system/lvc-checkbox';
import LVCFormElement from '../../../design-system/lvc-form-element';

export default function DxCheckbox(props: {
  container: PContainer;
}): JSX.Element {
  const { container } = props;
  if (container.config.readOnly) {
    // Show only the label and the selected location value (or fallback)
    return (
      <div className="paddingBottom1_v2sBX">
        <label
          className="label_dQA2Y marginBottomHalf_HqntJ regular_u61RY fontSize3_hUHe0"
          style={{ display: 'block', marginBottom: '0.25rem' }}
        >
          {container.config.label}
        </label>
        <div
          id={container.config.label}
          className="readonlyDisplay fontSizeInput_iB7ra paddingVerticalInput_wCTe9 paddingHorizontalInput_tn7be"
          aria-label={container.config.label}
        >
          {props.container.config.value ? props.container.config.trueLabel : props.container.config.falseLabel}
        </div>
      </div>
    );
  }

  return (
    <LVCFormElement id={props.container.id}
      hint={props.container.config.helperText}
      error={props.container.config.validatemessage}>
      <LVCCheckbox id={props.container.id}
        label={props.container.config.caption}
        value={props.container.config.value}
        readonly={props.container.config.readOnly}
        onChange={v => {
          props.container.updateFieldValue(v);
          props.container.triggerFieldChange(v);
        }}
      />
    </LVCFormElement>
  );
}
