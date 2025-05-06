export const pegaConfig = {
    appAlias: 'LabbCS',
    pegaServerUrl: 'https://labbconsulting05.pegalabs.io/prweb',
    staticContentUrl: 'https://cs-cdn.constellation.pega.io/stage/8.24.51-236/react/prod',
    redirectUrl: `${new URL(window.location.href).pathname}auth.html`,
    authService: 'pega',
    clientId: '13576784492731597416',
    pkce: true
}

// for localhost:
// export const pegaConfig = {
//     appAlias: 'labb-cs',
//     pegaServerUrl: 'http://localhost:3333/prweb',
//     staticContentUrl: 'https://cs-cdn.constellation.pega.io/stage/8.24.51-236/react/prod',
//     redirectUrl: `${new URL(window.location.href).pathname}auth.html`,
//     authService: 'pega',
//     clientId: '13576784492731597416',
//     pkce: true
// }