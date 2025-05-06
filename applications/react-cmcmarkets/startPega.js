function startLabbEmbed(el) {
    const host = $(el);
    host.innerHTML = '';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://localhost:8081/cmcmarkets.umd.js';
    host.appendChild(script);
    const embed = document.createElement('labb-embed');
    embed.setAttribute('style', 'display:block;height:100%;')
    embed.setAttribute('server-url', 'http://localhost:3333/prweb');
    embed.setAttribute('deploy-url', 'http://localhost:3333/8.24.51-236/react/prod/');
    embed.setAttribute('token', JSON.stringify({ token_type: 'bearer', access_token: 'some-token' }));
    embed.setAttribute('case-type-i-d', 'OWXZJQ-Workflow-Work-CMCOnboarding');
    host.appendChild(embed);
}
// platform: side bar
startLabbEmbed('.next-gen-customer-hub__page-content');
startLabbEmbed('#enquiry-form')



function startPegaEmbed(el) {
    const host = $(el);
    host.innerHTML = '';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://release.constellation.pega.com/8.24.50/react/prod/pega-embed.js';
    host.appendChild(script);
    const embed = document.createElement('pega-embed');
    embed.setAttribute('pegaServerUrl', 'http://localhost:3333/prweb/');
    embed.setAttribute('staticContentUrl', 'https://release.constellation.pega.com/8.24.50/react/prod/');
    embed.setAttribute('authService', 'pega');
    embed.setAttribute('grantType', 'authCode');
    embed.setAttribute('clientId', '64561558121738061132');
    embed.setAttribute('clientSecret', '');
    embed.setAttribute('tokenType', '');
    embed.setAttribute('action', 'createCase');
    embed.setAttribute('caseTypeID', 'OWXZJQ-Workflow-Work-CMCOnboarding');
    embed.setAttribute('casePage', '');
    embed.id = 'theEmbed';
    embed.style = 'width:100%';
    host.appendChild(embed);
}

startPegaEmbed('.next-gen-customer-hub__page-content');

// retail: enquiry
startLabbEmbed('#enquiry-form')
startPegaEmbed('#enquiry-form')