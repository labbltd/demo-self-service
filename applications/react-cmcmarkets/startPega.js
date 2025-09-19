function startLabbEmbed(el, caseTypeId) {
    const host = $(el);
    host.innerHTML = '';

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'http://localhost:8080/cmcmarkets.umd.js';
    host.appendChild(script);
    const embed = document.createElement('labb-embed');
    embed.setAttribute('style', 'display:block;height:100%;')
    embed.setAttribute('infinity-server', 'http://localhost:3333/prweb');
    embed.setAttribute('deploy-url', 'http://localhost:3333/8.24.51-236/react/prod/');
    embed.setAttribute('token', JSON.stringify({ token_type: 'bearer', access_token: 'some-token' }));
    embed.setAttribute('case-type-i-d', caseTypeId);
    host.appendChild(embed);
}
function startLabbEmbed(el, caseTypeId) {
    const host = $(el);
    host.innerHTML = '';

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'http://localhost:8080/cmcmarkets.umd.js';
    host.appendChild(script);
    const embed = document.createElement('labb-embed');
    embed.setAttribute('style', 'display:block;height:100%;')
    embed.setAttribute('infinity-server', 'https://labbconsulting05.pegalabs.io/prweb');
    embed.setAttribute('deploy-url', 'http://localhost:3333/8.24.51-236/react/prod/');
    embed.setAttribute('token', JSON.stringify({
        "access_token": "eyJraWQiOiJBQjFCQUVERjlBN0JGNDZDNENBNjA3M0I5MjgwQzNENiIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJ1cm46NDUwODE1MDkxODE0NzQ1MDM3MDAiLCJzdWIiOiJkYW5pZWxAbGFiYi5sdGQiLCJhcHBfbmFtZSI6IldvcmtmbG93IiwibmJmIjoxNzU4MjAzNDE1LCJhcHBfdmVyc2lvbiI6IjAxLjAxLjAxIiwiaXNzIjoidXJuOmxhYmJjb25zdWx0aW5nMDUucGVnYWxhYnMuaW8iLCJleHAiOjE3NTgyMDcwMTUsImlhdCI6MTc1ODIwMzQxNSwianRpIjoiMEEyNzU0OEQxNzc4OTU3ODZDQUQ1MDE2RkIxRkQ2OTQiLCJvcGVyYXRvcl9hY2Nlc3MiOiJXb3JrZmxvdzpBdXRob3JzIn0.Xx8izCa2aOPUaiNWtFJRUlbQX9nuu50P2kvyFUsZVOJwqbE-SJH0XZiGR-dXanNW3hdY1bdAsj_te0PJoIUIho7Ocgk_ddVoV5NmXTFUmEblCnsxlxPGR0PuL4V1RxiYPKVtbKBvl7J-8oSHnZ891rQTUjm9LVsjQRxJHcf2f6kOY32DJs-_Faww0RH4fbHMPvMWvBBPQ9bOePIP0JIrlwF0jvsQWwe0EeLxgrMVdp4RnFsMSxqtN3uukY0Jli6BKVdkLujIBAOYT-se10ej1-zBw5dtneNhbuF3H8N6bL8hzYmnWFACLeYVwR-luWLlmkKHVudkMNbV5_JXxrVv06uzbi2v5mmS5eByRZcoyR1KSUqvFhuv-_B_kzYBTtX5IRPA10oZ4ZpR30H78tvJll0JntbphKSJiGHVTznbBMI0NdU0zjnh-Glk9KPuIiO8U2bdP8QjGNenEctNflCGgRBDO4AVxIRjOvXMHFr2f8KsWQV8Fp_T7x5PG_yqftxsXnHE9XW-etohk-s9xIl-pB9QokuarVkqVATQMFPBr_tK9HVannuptdiJoFalC2Z8PybVv-uKHRuZ8un8Po-jPHSfTBHFlwNDw0k2It1tTAB5w_y4tfqJk51-VSoWNPS9DFjiXY_KMjREWYC8nzaQ3h4BnA0JBrVcpCWwnARFk3Q",
        "token_type": "bearer",
        "expires_in": 3600
    }));
    embed.setAttribute('case-type-i-d', caseTypeId);
    host.appendChild(embed);
}
// platform: side bar
startLabbEmbed('form', 'OWXZJQ-Workflow-Work-CMCOnboarding');
startLabbEmbed('.next-gen-customer-hub__page-content', 'OWXZJQ-Workflow-Work-CMCOnboarding');
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