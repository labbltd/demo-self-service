import { Location } from "@labb/dx-engine";
import HsbcFormElement from "applications/react-hsbc/design-system/hsbc-form-element";
import HsbcInput from "applications/react-hsbc/design-system/hsbc-input";
import HsbcSelect from "applications/react-hsbc/design-system/hsbc-select";
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

    async function updateSearch(value: string) {
        setSearchValue(value)
        setSuggestions(await container.getPlacePredictions(value));
    }

    async function select(value: string) {
        container.updateFieldValue(value);
        container.triggerFieldChange(value);
    }

    return <>
        {container.config.readOnly && <>
            <dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd>
        </>}
        {!container.config.readOnly && <>
            <HsbcFormElement
                label={props.container.config.label}
                id={props.container.id}
                hint={props.container.config.helperText}
                error={props.container.config.validatemessage}>
                <>
                    <HsbcInput id={props.container.id}
                        type="text"
                        invalid={props.container.config.validatemessage}
                        value={searchValue}
                        onChange={(event) => updateSearch(event.target.value)}
                    />
                    {suggestions.length > 0 &&
                        <HsbcSelect id={props.container.id}
                            options={suggestions.map(suggestion => ({ key: suggestion, value: suggestion }))}
                            value={props.container.config.value}
                            onChange={v => select(v)} />
                    }
                </>
            </HsbcFormElement>
            {container.config.value && <div ref={map} style={{ height: '25rem' }}></div>}
        </>
        }
    </>
}