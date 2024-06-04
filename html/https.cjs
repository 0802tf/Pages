const https = require('https');

const zipcode = '8100064';
const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`;
new Promise((resolve, reject) => https.get(url, res => resolve(res)).on('error', e => reject(e))).then(res => new Promise((resolve, reject) => {
    if (res.statusCode !== 200) {
        reject(res.statusCode);
        return;
    }
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => resolve(data));
})).then(data => new Promise((resolve, reject) => {
    try {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
    } catch (e) {
        reject(e);
    }
})).then(parsedData => {
    console.log(parsedData);
    console.log(JSON.stringify(parsedData.results[0]));
}).catch(e => console.error(e));
