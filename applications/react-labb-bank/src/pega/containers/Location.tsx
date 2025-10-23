import { Location as PLocation } from '@labb/dx-engine';
import { Input, Select, Form } from 'antd';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export default function Location(props: {
  container: PLocation;
}): JSX.Element {
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

  async function updateSearch(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearchValue(value);
    setSuggestions(await container.getPlacePredictions(value));
  }

  async function select(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    await container.setLocation(value);
  }

  if (container.config.readOnly) {
    return (
      <Form.Item label={container.config.label}>
        <div>{container.config.value ?? '--'}</div>
      </Form.Item>
    );
  }

  return (
    <Form.Item
      label={container.config.label}
      required={container.config.required}
      help={container.config.helperText}
      validateStatus={container.config.validatemessage ? 'error' : ''}
      extra={container.config.validatemessage}
    >
      <Input
        id={container.id}
        type="text"
        value={searchValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) => updateSearch(event)}
        placeholder="Search location..."
      />
      {suggestions.length > 0 && (
        <Select
          value={container.config.value || undefined}
          onChange={(value) => select({ target: { value } } as any)}
          style={{ width: '100%', marginTop: 8 }}
          placeholder={`Select ${container.config.label}...`}
        >
          {suggestions.map((suggestion) => (
            <Select.Option key={suggestion} value={suggestion}>
              {suggestion}
            </Select.Option>
          ))}
        </Select>
      )}
      <div
        ref={map}
        style={{
          height: '25rem',
          marginTop: '1rem',
          display: container.config.value ? 'block' : 'none',
        }}
      ></div>
    </Form.Item>
  );
}
