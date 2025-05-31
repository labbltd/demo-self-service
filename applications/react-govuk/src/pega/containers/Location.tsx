import { Location } from "@labb/dx-engine";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function DxLocation(props: { container: Location }) {
    const { container } = props;
    const map = useRef(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState<string>(container.config.value);

    useEffect(() => {
        (async () => {
            if (map.current) {
                await container.loadMap(map.current);
            }
        })();
    }, [map.current]);

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
        return <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">
                {container.config.label}
            </dt>
            <dd className="govuk-summary-list__value">
                {container.config.value}
            </dd>
        </div>
    }
    return <>
        <div className={"govuk-form-group" + (container.config.validatemessage ? ' govuk-form-group--error' : '')}>
            <label className="govuk-label" htmlFor={container.id}>
                {container.config.label}{!container.config.required && ' (Optional)'}
            </label>
            {container.config.helperText && <div className="govuk-hint">
                {container.config.helperText}
            </div>}
            {container.config.validatemessage && <p className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> {container.config.validatemessage}
            </p>}
            <input className="govuk-input"
                type="text"
                value={searchValue}
                onChange={(e) => updateSearch(e)}
            />
        </div>
        {suggestions.length > 0 &&
            <div className="govuk-form-group">
                <select className="govuk-select"
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
        <div ref={map} style={{ height: '25rem', display: container.config.value ? 'block' : 'none' }}></div>
    </>
}