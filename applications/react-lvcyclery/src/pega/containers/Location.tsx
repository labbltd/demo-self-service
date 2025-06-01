import { Location } from "@labb/dx-engine";
import LvcError from "applications/react-lvcyclery/design-system/lvc-error";
import LVCFormElement from "applications/react-lvcyclery/design-system/lvc-form-element";
import LVCInput from "applications/react-lvcyclery/design-system/lvc-input";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function DxLocation(props: { container: Location; readonly?: boolean }) {
  const map = useRef<HTMLDivElement | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>(props.container.config.value || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { container, readonly } = props;

  useEffect(() => {
    (async () => {
      if (map.current) {
        await container.loadMap(map.current);
      }
    })();
  }, [map.current]);

  useEffect(() => {
    (async () => {
      if (container.config.value && !searchValue) {
        const event = { target: { value: container.config.value } } as any;
        await updateSearch(event);
        await select(event);
        await container.putMarker(container.config.value);
      }
    })();
  }, [container.config.value]);

  async function updateSearch(event: ChangeEvent) {
    const value = (event.target as HTMLInputElement)?.value;
    setSearchValue(value)
    setSuggestions(await container.getPlacePredictions(value));
    setShowSuggestions(true);
  }

  async function select(event: ChangeEvent) {
    const value = (event.target as HTMLSelectElement).value;
    container.updateFieldValue(value);
    container.triggerFieldChange(value);
  }

  if (readonly || container.config.readOnly) {
    // Show only the label and the selected location value (or fallback)
    return (
      <div className="paddingBottom1_v2sBX">
        <label
          className="label_dQA2Y marginBottomHalf_HqntJ regular_u61RY fontSize3_hUHe0"
          style={{ display: 'block', marginBottom: '0.25rem' }}
          htmlFor={container.config.label}
        >
          {container.config.label}
        </label>
        <div
          id={container.config.label}
          className="readonlyDisplay fontSizeInput_iB7ra paddingVerticalInput_wCTe9 paddingHorizontalInput_tn7be"
          aria-label={container.config.label}
        >
          {container.config.value || 'No location selected'}
        </div>
      </div>
    );
  }

  // Editable mode
  return (
    <>
      <div className="paddingBottom1_v2sBX" style={{ position: 'relative' }}>
        <LVCFormElement
          label={props.container.config.label}
          id={props.container.id}
          hint={props.container.config.helperText}
          error={props.container.config.validatemessage}
        >
          <LVCInput id={props.container.id}
            type={'text'}
            invalid={props.container.config.validatemessage}
            value={searchValue}
            onChange={updateSearch}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
            readonly={props.container.config.readOnly}
          />
        </LVCFormElement>

        {showSuggestions && suggestions.length > 0 && (
          <ul
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              listStyle: 'none',
              marginTop: '-31px',
              padding: 0,
              width: '100%',
              maxHeight: '10rem',
              overflowY: 'auto',
              zIndex: 1000,
            }}
          >
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                style={{ padding: '0.5rem', cursor: 'pointer' }}
                onMouseDown={() => select({ target: { value: suggestion } } as any)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div ref={map} style={{ height: '25rem', marginBottom: '1.5rem', display: container.config.value ? 'block' : 'none' }}></div>
    </>
  );
}
