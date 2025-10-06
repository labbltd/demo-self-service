import { PContainer } from "@labb/dx-engine";
import { useEffect, useState } from "react";
import { BOISelect } from "../design-system/select";

export default function AutoComplete(props: { container: PContainer }) {
    const [list, setList] = useState<any[]>([]);
    useEffect(() => {
        (async () => {
            const data = await window.PCore.getDataApiUtils()
                .getData(
                    props.container.config.datasource,
                    {
                        dataViewParameters: {}
                    },
                    ''
                )
            const key = props.container.config.columns[0].value.replace('\.', '');
            const value = props.container.config.columns[1].value.replace('\.', '');
            setList(data.data.data.map(item => ({ key: item[key], value: item[value] })));
        })()
    }, []);

    return list.length > 0 ? <BOISelect id={props.container.id}
        label={props.container.config.label}
        value={props.container.config.value}
        hint={props.container.config.helperText}
        select={(value, key) => {
            props.container.updateFieldValue(key);
            props.container.triggerFieldChange(key);
        }}
        options={list}
    /> : <div>loading...</div>
}