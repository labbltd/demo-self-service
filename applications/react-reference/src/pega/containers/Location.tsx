import { Location } from "@labb/dx-engine";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function DxLocation(props: { container: Location }) {
    const map = useRef(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
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

    return <>
        <label> {container.config.label}
            <input type="text" value={searchValue} onChange={(event) => updateSearch(event)} />
        </label>
        {suggestions.length > 0 &&
            <select value={container.config.value} onChange={(event) => select(event)}>
                <option value={''}>Select {container.config.label}...</option>
                {suggestions.map(suggestion =>
                    <option key={suggestion} value={suggestion}>{suggestion}</option>
                )}
            </select>
        }
        <div ref={map} style={{ height: '25rem' }}></div>
    </>
}