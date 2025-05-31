import { Select, SelectItem, TextInput } from "@carbon/react";
import { Location } from "@labb/dx-engine";
import { useEffect, useRef, useState } from "react";

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

    useEffect(() => {
        if (container.config.value) {
            updateSearch(container.config.value);
            container.setLocation(container.config.value);
        }
    }, [container.config.value])

    async function updateSearch(event: { target: HTMLInputElement }) {
        const value = event.target?.value;
        setSearchValue(value)
        setSuggestions(await container.getPlacePredictions(value));
    }

    async function select(event: { target: HTMLInputElement }) {
        container.setLocation(event.target.value);
    }
    if (props.container.config.readOnly) {
        return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
    }
    return <>
        <TextInput
            id={container.config.label}
            type="text"
            value={searchValue}
            labelText={container.config.label}
            helperText={container.config.helperText}
            invalid={!!container.config.validatemessage}
            invalidText={container.config.validatemessage}
            onChange={(event) => updateSearch(event)}
        />
        {suggestions.length > 0 && <>
            <Select
                id={container.config.label}
                defaultValue="Select..."
                value={container.config.value}
                labelText={container.config.label}
                helperText={container.config.helperText}
                invalid={!!container.config.validatemessage}
                invalidText={container.config.validatemessage}
                onChange={(event) => select(event)}>
                <option value={''}>Select {container.config.label}...</option>
                {suggestions.map(suggestion =>
                    <SelectItem
                        key={suggestion}
                        value={suggestion}
                        text={suggestion}
                    />
                )}
            </Select>
        </>
        }
        <div ref={map} style={{ height: '25rem', display: container.config.value ? 'block' : 'none' }}></div>
    </>
}