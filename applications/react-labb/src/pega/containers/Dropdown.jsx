import { Option, Select } from "@material-tailwind/react";
import FormControl from "../components/FormControl";

export default function DxDropdown(props) {
    const { label, value, datasource = [], validatemessage, helpertext } = props.container.config;
    function setValue(value) {
        props.container.updateFieldValue(value);
        props.container.triggerFieldChange(value);
    }
    return <FormControl validatemessage={validatemessage} helpertext={helpertext}>
        <Select label={label} size="lg" error={!!validatemessage} value={value} onChange={v => setValue(v)}>
            {datasource.map(
                item => <Option key={item.key} value={item.value}>{item.value}</Option>
            )}
        </Select>
    </FormControl>
}
