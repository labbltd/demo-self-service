import { PContainer } from "@labb/dx-engine";
import { Button } from "antd";

export default function DxActionableButton(props: { container: PContainer }) {
    const { container } = props;

    function performAction() {
        container.pconnect
            .getActionsApi()
            .openLocalAction(container.config.localAction, {
                caseID: container.config.value,
                containerName: 'modal',
                type: 'express'
            });
    }

    return <div>
        <Button onClick={() => performAction()}>{container.config.label}</Button>
    </div>
}