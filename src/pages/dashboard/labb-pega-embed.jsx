import { pegaConfig } from "@/pega/config";
import { LoggerService, OAuth2Service } from "@labb/dx-engine";
import { PegaEmbed } from "@labb/react-adapter";
import { useEffect, useState } from "react";

export default function LabbPegaEmbed(props) {
    const [token, setToken] = useState();

    useEffect(() => {
        LoggerService.enabled = true;
        (async () => {
            const t = localStorage.getItem('labbtoken');
            if (t) {
                setToken(JSON.parse(t));
            } else {
                const t = await OAuth2Service.getTokenAuthorizationCode({
                    accessTokenUrl: `${pegaConfig.pegaServerUrl}/PRRestService/oauth2/v1/token`,
                    authorizationUrl: `${pegaConfig.pegaServerUrl}/PRRestService/oauth2/v1/authorize`,
                    clientId: pegaConfig.clientId,
                    pkce: pegaConfig.pkce,
                    appId: pegaConfig.appAlias,
                    authService: pegaConfig.authService
                });
                localStorage.setItem('labbtoken', JSON.stringify(t));
                setToken(t);
            }
        })();
    }, []);

    return token ? <PegaEmbed
        token={token}
        serverUrl={pegaConfig.pegaServerUrl}
        caseTypeID={props.caseTypeID} /> : <div>Authenticating...</div>;
}