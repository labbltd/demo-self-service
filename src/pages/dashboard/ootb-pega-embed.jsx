import { pegaConfig } from "@/pega/config";

export default function OotbPegaEmbed(props) {
    return <pega-embed id='theEmbed'
        action='createCase'
        caseTypeID={props.caseTypeID}
        casePage='assignment'
        appAlias={pegaConfig.appAlias}
        pegaServerUrl={pegaConfig.pegaServerUrl}
        staticContentUrl={pegaConfig.staticContentUrl}
        autoReauth='true'
        authService={pegaConfig.authService}
        clientId={pegaConfig.clientId}
        style={{ width: '100%' }}></pega-embed>
}