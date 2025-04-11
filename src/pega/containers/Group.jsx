import { GeneratePContainer } from "@labb/react-adapter";
import { Typography } from "@material-tailwind/react";

export default function DxGroup(props) {
    const { showHeading, heading, showLabel, label, instructions } = props.container.config;
    return <>
        {(showHeading || showLabel) && <Typography variant="h6" color="blue-gray" className="mt-6">
            {heading || label}
        </Typography>}
        {instructions && instructions !== 'none' && <Typography color="gray" className="mt-1 font-normal">
            {instructions}
        </Typography>}
        <div className="mb-1 mt-6">
            {props.container.children.map((child, index) => (
                <GeneratePContainer key={child.id + index} container={child} />
            ))}
        </div>
    </>
}