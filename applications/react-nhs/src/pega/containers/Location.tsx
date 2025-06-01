import { Location } from "@labb/dx-engine";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function DxLocation(props: { container: Location }) {
    const map = useRef(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState<string>(props.container.config.value);
    const { container } = props;

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
    }

    async function select(event: ChangeEvent) {
        const value = (event.target as HTMLSelectElement).value;
        container.updateFieldValue(value);
        container.triggerFieldChange(value);
    }
    if (container.config.readOnly) {
        return <div className="nhsuk-summary-list__row">
            <dt className="nhsuk-summary-list__key">
                {props.container.config.label}
            </dt>
            <dd className="nhsuk-summary-list__value">
                {props.container.config.value}
            </dd>
        </div>
    }
    return <>
        <div className={"nhsuk-form-group" + (container.config.validatemessage ? " nhsuk-form-group--error" : "")}>
            <label className="nhsuk-label" htmlFor={container.id}>
                {container.config.label}{!container.config.required ? ' (Optional)' : ''}
            </label>
            {container.config.helperText && <div className="nhsuk-hint">
                {container.config.helperText}
            </div>}
            {container.config.validatemessage && <p className="nhsuk-error-message">
                <span className="nhsuk-visually-hidden">Error:</span> {container.config.validatemessage}
            </p>}
            <input className="nhsuk-input"
                type="text"
                value={searchValue}
                onChange={(e) => updateSearch(e)}
            />
        </div>
        {suggestions.length > 0 &&
            <div className="nhsuk-form-group">
                <select className="nhsuk-select"
                    onChange={(event) => select(event)}
                    value={container.config.value}
                >
                    <option value="">
                        Select...
                    </option>
                    {suggestions.map(suggestion =>
                        <option key={suggestion} value={suggestion}>{suggestion}</option>
                    )}
                </select>
            </div>
        }
        <div className="nhsuk-form-group">
            <div ref={map} style={{ height: '25rem', marginBottom: '1.5rem', display: container.config.value ? 'block' : 'none' }}></div>
        </div>
    </>
}