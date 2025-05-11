import { DemoBootstrap } from '@labb/demo-utilities';
import { PegaEmbed } from "@labb/react-adapter";
import { useEffect, useState } from "react";

export default function LabbPegaEmbed() {
    const [token, setToken] = useState();

    useEffect(() => {
        (async () => {
            setToken(await DemoBootstrap.getToken());
        })();
    }, []);

    return token ? <PegaEmbed
        token={token}
        caseTypeID={DemoBootstrap.getCaseTypeId()}
        serverUrl={DemoBootstrap.getServerUrl()}
        localeID={DemoBootstrap.getLocaleId()}
        appID={DemoBootstrap.getAppId()}
    /> : <div>Authenticating...</div>;
}