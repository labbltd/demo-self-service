import { Location } from "@labb/dx-engine";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function DxLocation(props: { container: Location }) {
    const map = useRef<HTMLDivElement | null>(null);
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
        container.setLocation(value);
    }

    return <>
        {container.config.readOnly && <>
            <dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd>
        </>}
        {
            !container.config.readOnly && <>
                <label htmlFor={container.id}>
                    {container.config.label}
                    {container.config.required ? ' *' : ''}
                    {props.container.config.helperText && <span data-tooltip={props.container.config.helperText}>?</span>}
                </label>
                {props.container.config.validatemessage && <em>{props.container.config.validatemessage}</em>}
                <input type="text" id={container.id} value={searchValue} onChange={(event) => updateSearch(event)} />
                {suggestions.length > 0 &&
                    <select value={container.config.value} onChange={(event) => select(event)}>
                        <option value={''}>Select {container.config.label}...</option>
                        {suggestions.map(suggestion =>
                            <option key={suggestion} value={suggestion}>{suggestion}</option>
                        )}
                    </select>
                }
                {container.config.value && <div ref={map} style={{ height: '25rem' }}></div>}
            </>
        }
    </>
}