import { GeneratePContainer } from "@labb/react-adapter";
import { Typography } from "@material-tailwind/react";

export default function DxRegion(props) {
    const { label } = props.container.config;
    return <>
        {label && <Typography variant="h6" color="blue-gray" className="mt-6">
            {label}
        </Typography>}
        {props.container.children.map((child, index) => (
            <GeneratePContainer key={child.id + index} container={child} />
        ))}
    </>
}