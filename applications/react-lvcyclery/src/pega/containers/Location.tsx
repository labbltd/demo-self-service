import { Location } from "@labb/dx-engine";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function DxLocation(props: { container: Location; readonly?: boolean }) {
  const map = useRef<HTMLDivElement | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>(props.container.config.value || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { container, readonly } = props;

useEffect(() => {
  (async () => {
    if (map.current && !readonly) {
      await container.loadMap(map.current);

      const value = container.config.value;
      if (value) {
        setSearchValue(value);
        handleSelectSuggestion(value); // Reuse the working selection logic
      }
    }
  })();
}, [readonly, container]);


  async function updateSearch(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearchValue(value);
    if (value.trim()) {
      const results = await container.getPlacePredictions(value);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSelectSuggestion(suggestion: string) {
    setSearchValue(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    container.updateFieldValue(suggestion);
    container.triggerFieldChange(suggestion);
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
        <label
          className="label_dQA2Y marginBottomHalf_HqntJ regular_u61RY fontSize3_hUHe0"
          style={{ display: 'block', marginBottom: '0.25rem' }}
        >
          {container.config.label}
        </label>
        <input
          type="text"
          style={{ width: '100%' }}
          value={searchValue}
          onChange={updateSearch}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              listStyle: 'none',
              marginTop: 0,
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
                onMouseDown={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div ref={map} style={{ height: '25rem' }}></div>
    </>
  );
}
