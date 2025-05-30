export default function LVCSelect(props: {
  id: string;
  invalid?: boolean;
  value?: string;
  options: { key: string; value: string }[];
  onChange?: (v: string) => void;
  readonly?: boolean; // added readonly prop
}) {
  // Find the display text for the current value
  const selectedOption = props.options.find(o => o.key === props.value);
  const displayText = selectedOption ? selectedOption.value : 'Please select';

  if (props.readonly) {
    // Render plain label for readonly mode
    return (
      <div
        className={
          "readonlySelect fontSizeInput_iB7ra paddingHorizontalInput_tn7be paddingVerticalInput_wCTe9"
          + (props.invalid ? ' invalid_CDER8' : '')
        }
        id={props.id}
      >
        {displayText}
      </div>
    );
  }

  // Editable mode: render the original select input
  return (
    <div className="select_cyVdT fontSizeInput_iB7ra">
      <div
        className="selectValue_Td2sD paddingHorizontalInput_tn7be paddingVerticalInput_wCTe9"
        role="presentation"
      >
        {displayText}
      </div>
      <select
        className={
          "selectControl_o0KGX paddingHorizontalInput_tn7be paddingVerticalInput_wCTe9"
          + (props.invalid ? ' invalid_CDER8' : '')
        }
        data-testid="Select"
        id={props.id}
        name={props.id}
        value={props.value}
        onChange={e => props.onChange?.(e.target.value)}
      >
        <option value="">Please select</option>
        {props.options.map(option => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
      <div className="selectIcon_Gna30">
        <div
          role="presentation"
          className="icon_QFBvN alignTop_ktLnP defaultColour_TPYhA tiny_EmkPZ"
        >
          <svg focusable="false" viewBox="0 0 120 120">
            <polygon points="96.726,32 59.956,68.778 23.231,32.044 12,43.278 59.999,91.29 70.259,81.028 70.259,81.028 108,43.276 "></polygon>
          </svg>
        </div>
      </div>
    </div>
  );
}
