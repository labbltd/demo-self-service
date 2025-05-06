import { Input } from "@material-tailwind/react";
import FormControl from "../components/FormControl";

export default function DxInput(props) {
    const { label, value, placeholder, validatemessage, helpertext } = props.container.config;
    function changeValue(value) {
        props.container.updateFieldValue(value);
    }
    function commitValue(value) {
        props.container.triggerFieldChange(value);
    }
    return <FormControl validatemessage={validatemessage} helpertext={helpertext}>
        <Input
            value={value}
            onChange={v => changeValue(v.target.value)}
            onBlur={v => commitValue(v.target.value)}
            label={label}
            size="lg"
            placeholder={placeholder}
            error={!!validatemessage}
        />
    </FormControl>;
}
