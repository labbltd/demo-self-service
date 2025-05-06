import { Radio, Typography } from "@material-tailwind/react";
import FormControl from "../components/FormControl";

export default function DxRadioButtons(props) {
    const { label, value, datasource = [], validatemessage, helpertext } = props.container.config;
    function setValue(value) {
        props.container.updateFieldValue(value);
        props.container.triggerFieldChange(value);
    }
    return <FormControl validatemessage={validatemessage} helpertext={helpertext}>
        <Typography color="blue-gray" className="font-medium">
            {label}
        </Typography>
        {datasource.map(item =>
            <Radio name={props.container.id} key={item.key} label={item.value} checked={item.value === value} onChange={() => setValue(item.value)} />
        )}
    </FormControl>
}