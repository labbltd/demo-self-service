export default function PegaEmbed(props) {
    return <pega-embed id='theEmbed'
        action='createCase'
        caseTypeID={props.caseTypeID}
        casePage='assignment'
        appAlias='labb-cs'
        pegaServerUrl='https://labbconsulting05.pegalabs.io/prweb/'
        autoReauth='true'
        authService='pega'
        clientId='13576784492731597416'
        style={{ width: '100%' }}></pega-embed>
}