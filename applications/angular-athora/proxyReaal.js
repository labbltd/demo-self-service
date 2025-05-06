var httpProxy = require('http-proxy');
var fs = require('fs');


function cors(proxyRes) {
    console.log('Raw [target] response', JSON.stringify(proxyRes.headers, true, 2));

    proxyRes.headers['access-control-allow-origin'] = "*";
    proxyRes.headers['access-control-allow-headers'] = "*";
    proxyRes.headers['access-control-allow-methods'] = "GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH";

    console.log('Updated [proxied] response', JSON.stringify(proxyRes.headers, true, 2));
}

const proxyReaal = httpProxy.createProxyServer({
    target: {
        protocol: 'https:',
        host: 'api.reaal.nl',
        port: 443
    },
    changeOrigin: true,
});
proxyReaal.on('proxyRes',  proxyRes => cors(proxyRes));
proxyReaal.listen(8001);