const fs = require('fs');
const path = require('path');

fs
    .readFileSync('styles.scss', { encoding: 'utf8' })
    .match(/url\((.+?)\)/g)
    .reduce((acc, urlMatch) => {
        const p = urlMatch.match(/url\(["']?(.+?)["']?\)/)[1];
        if (!p.startsWith('data:') && p.includes('images')) {
            if (!acc.includes(p)) {
                acc.push(p);
            }
        }
        return acc;
    }, [])
    .forEach(async p => {
        const fullUrl = `https://partner.citi.com/${path.join('pp-ui/static/', p)}`;
        console.log('fetching %s', fullUrl)
        const r = await fetch(fullUrl);
        if (r.ok) {
            fs.writeFileSync(path.join('design-system', p), await r.bytes());
            console.log('succesfully written %s', fullUrl)
        } else {
            console.log('failed downloading %s', fullUrl)
        }
    })