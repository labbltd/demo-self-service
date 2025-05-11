import { Checkbox, Typography } from "@material-tailwind/react";
import FormControl from "../components/FormControl";

export default function DxCheckbox(props) {
    const { label, caption, value, validatemessage, helpertext } = props.container.config;
    function changeValue(value) {
        props.container.updateFieldValue(value);
        props.container.triggerFieldChange(value);
    }
    return <FormControl validatemessage={validatemessage} helpertext={helpertext}>
        <Typography variant="h6">{label}</Typography>
        <Checkbox
            checked={value}
            onChange={v => changeValue(v.target.checked)}
            size="lg"
            label={caption}
            color={!!validatemessage ? 'red' : 'blue'}
        />
    </FormControl>;
}
