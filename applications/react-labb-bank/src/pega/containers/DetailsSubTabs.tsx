import { PContainer, PContainerFactory } from "@labb/dx-engine";
import { GeneratePContainer } from "@labb/react-adapter";
import { Spin, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";

export default function DxDetailsSubTabs(props: { container: PContainer }) {
    const [items, setItems] = useState<TabsProps['items']>([]);
    const [activeTabId, setActiveTabId] = useState<string>('');

    const onChange = async (key: string) => {
        const child = props.container.pconnect
            .getChildren()[0]
            .getPConnect()
            .getChildren()
            .filter(child => (child.getPConnect() as any).isVisible())[+key]
        if (!(items![+key] as any).loaded) {
            const childContainer = await PContainerFactory.create(child.getPConnect().getComponentName(), child.getPConnect());
            const updatedItems = [...items!];
            updatedItems![+key].children = <GeneratePContainer container={childContainer} />;
            (updatedItems![+key] as any).loaded = true;
            setItems(updatedItems);
        }
    };

    useEffect(() => {
        setItems(props.container.pconnect
            .getChildren()[0]
            .getPConnect()
            .getChildren()
            .filter(child => (child.getPConnect() as any).isVisible())
            .map((child, idx) => {
                const configProps = (child.getPConnect().getConfigProps() as any);
                const label = configProps.inheritedProps.find((prop: any) => prop.prop === 'label').value;
                return {
                    key: '' + idx,
                    label: label,
                    loaded: false,
                    children: <Spin />
                }
            }));
    }, []);

    useEffect(() => {
        if (!activeTabId && items?.length && items.length > 0) {
            onChange('0');
        }
    }, [items])
    return <Tabs items={items} onChange={onChange} />
}