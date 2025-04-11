import { ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

export default function FormControl(props) {
    const { validatemessage, helpertext, children } = props;
    return <div className="w-full mt-6">
        {children}
        {helpertext && !validatemessage && <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal"
        >
            <InformationCircleIcon height={24} />
            {helpertext}
        </Typography>}
        {validatemessage && <Typography
            variant="small"
            color="red"
            className="mt-2 flex items-center gap-1 font-normal"
        >
            <ExclamationTriangleIcon height={24} />
            {validatemessage}
        </Typography>}
    </div>
}