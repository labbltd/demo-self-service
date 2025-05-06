const http = require('https');
const cheerio = require('cheerio');

(async () => {
    const docs = await Promise.all((await getNavPaths('/api/bundle/pcore-pconnect-88/page/pcore-pconnect-public-apis/api/apis-actionsapi-class.html')).map(path => urlToTsDoc(`/api/bundle/pcore-pconnect-88/page/${path}`)));
    docs.forEach(doc => console.log(doc));
})();

async function getNavPaths(url) {
    const html = await getHtml('docs-be.pega.com', url);
    const $ = cheerio.load(html.html);
    return $('li a').map(function () {
        return $(this).attr('data-navpath');
    }).toArray();
}

async function urlToTsDoc(url) {
    const method = await getHtml('docs-be.pega.com', url);
    const doc = getDoc(method.html);
    return toTsDoc(method.name, doc);
}

function toTsDoc(name, doc) {
    return `
    /** 
     * ${doc.description}
     * ${doc.parameters.map(p => `
     * @param ${p.name} - ${p.description}`)}
     * 
     * @returns ${doc.returns}
     * 
     * @example ${doc.example.description}
     * \`\`\`
    ${doc.example.code}
     \`\`\`
     */
    ${name}(${doc.parameters.map(p => `${p.name}${p.required ? '' : '?'}: ${p.type}`).join(', ')})`;
}

function getDoc(html) {
    const $ = cheerio.load(html);
    const description = $('.shortdesc').text();
    const returns = $('h2:contains("Returns")').next().text();
    const parameters = $('h2:contains("Parameters")').next().find('tbody tr').map(function () {
        const name = $(this).find('td:nth-child(1)').text();
        const type = $(this).find('td:nth-child(2)').text();
        const description = $(this).find('td:nth-child(3)').text();
        const required = $(this).find('td:nth-child(4)').text() === '✅';
        return { name, type, description, required };
    }).toArray();
    const exampleDesc = $('h2:contains("Usage example")').parent().find('.p').text();
    const exampleCode = $('h2:contains("Usage example")').parent().find('pre.codeblock code').text();
    return { description, parameters, example: { description: exampleDesc, code: exampleCode }, returns };
}

async function getHtml(domain, path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: domain,
            port: 443,
            path: path,
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let d = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                d += chunk;
            });
            res.on('end', () => {
                const parsed = JSON.parse(d);
                resolve({ html: parsed.topic_html, name: parsed.title.split('(')[0] });
            });
        });

        req.on('error', reject);

        req.end();
    });
}