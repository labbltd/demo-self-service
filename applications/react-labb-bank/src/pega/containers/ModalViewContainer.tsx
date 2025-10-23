import { ActionButton } from "@labb/constellation-core-types";
import { ModalViewContainer } from "@labb/dx-engine";
import { GeneratePContainer } from "@labb/react-adapter";
import { Button, Modal } from "antd";
import { useState } from "react";

export default function DxModalViewContainer(props: { container: ModalViewContainer }) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { container } = props;

    async function buttonClick(button: ActionButton): Promise<void> {
        try {
            setErrorMessage(null);
            setLoading(true);
            await container.buttonClick(button);
        } catch (e) {
            const error = e as { message: string; type: string };
            setErrorMessage(error?.message || error?.type || 'Error');
        }
        setLoading(false);
    }
    props.container.updates.subscribe(() => {
        setOpen(props.container.hasContainerItems());
    })

    return <>
        <Modal
            title={container.heading}
            open={open}
            confirmLoading={loading}
            footer={[
                ...props.container.actionButtons.secondary.map(button =>
                    <Button key={button.actionID}
                        disabled={loading}
                        onClick={() => buttonClick(button)}>
                        {button.name}
                    </Button>
                ),
                ...props.container.actionButtons.main.map(button =>
                    <Button key={button.actionID}
                        disabled={loading}
                        onClick={() => buttonClick(button)}>
                        {button.name}
                    </Button>
                )
            ]}
        >
            {props.container.children.map(child => (
                <GeneratePContainer key={child.id} container={child} />
            ))}
        </Modal>
    </>
}