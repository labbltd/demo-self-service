import { PContainer } from "@labb/dx-engine";
import CmCFormControl from "../../cmc-design/cmc-form-control";

export default function URL(props: { container: PContainer }) {
    return <CmCFormControl
        label={''}
        helperText={props.container.config.helperText}
        errorMessage={props.container.config.validatemessage}
        fullwidth={props.container.config.fieldMetadata.classID === 'OWXZJQ-Workflow-Work-CMCEnquire'}>
        <a href={'https://oaf.cmcmarkets.com/en-nl/onboarding-start'}>{props.container.config.label}</a>
    </CmCFormControl>
}