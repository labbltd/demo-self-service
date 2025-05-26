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
                {props.container.config.label}
            </dt>
            <dd className="govuk-summary-list__value">
                {props.container.config.value}
            </dd>
        </div>
    }
    return <>
        <div className="govuk-form-group">
            <label className="govuk-label">
                {container.config.label}
            </label>
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
        <div ref={map} style={{ height: '25rem' }}></div>
    </>
}