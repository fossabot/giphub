const fs = require('fs');
const ChromeExtension = require('crx');
const argv = require('minimist')(process.argv.slice(2));
const { name } = require('../build/manifest.json');

const keyPath = argv.key || 'key.pem';
const existsKey = fs.existsSync(keyPath);
const crx = new ChromeExtension({
    appId: argv['app-id'],
    codebase: argv.codebase,
    privateKey: existsKey ? fs.readFileSync(keyPath) : null,
});

crx.load(['build/manifest.json'])
    .then(() => crx.loadContents())
    .then((archiveBuffer) => {
        fs.writeFileSync(`${name}.zip`, archiveBuffer);

        if (!argv.codebase || !existsKey) {
            console.log('');
            console.log('Finished compressing.');
            console.log('If you want a signed build, put a key.pem into the repo folder.');
            return;
        }
        crx.pack(archiveBuffer).then((crxBuffer) => {
            const updateXML = crx.generateUpdateXML();

            fs.writeFileSync('update.xml', updateXML);
            fs.writeFileSync(`${name}.crx`, crxBuffer);
        });
    })
    .catch(console.error);
