import { Location } from "@labb/dx-engine";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import TextInput from "../../design-system/cb-text-input";

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

    if (props.container.config.readOnly) {
        return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd></>;
    }
    return <>
        <TextInput id={props.container.id}
            label={props.container.config.label}
            error={props.container.config.validatemessage}
            type={'text'}
            value={searchValue} onChange={(event) => updateSearch(event)} />
        {suggestions.length > 0 && <TextInput id={props.container.id} label={props.container.config.label} type={'select'} options={suggestions} value={container.config.value} onChange={(event) => select(event)} />}
        {container.config.value && <div ref={map} style={{ height: '25rem' }}></div>}
    </>
}