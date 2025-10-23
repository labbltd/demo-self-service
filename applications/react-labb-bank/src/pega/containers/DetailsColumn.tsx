import { PContainer } from "@labb/dx-engine";
import { Col, Row } from "antd";

export default function DetailsColumns(props: { container: PContainer }) {
    const items = props.container.children.map(child => child.children.map(child => ({
        label: child.config.label,
        children: child.config.value || '--'
    })));
    return <Row gutter={16}>
        {items.map((item, idx) => <Col span={12} key={idx} >
            <dl>
                {item.map((desc, index) => (
                    <div key={index}>
                        <dt><strong>{desc.label}</strong></dt>
                        <dd>{desc.children}</dd>
                    </div>
                ))}
            </dl>
        </Col>)}
    </Row>
}