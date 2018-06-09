function loadScript(name, tabId, cb) {
    if (process.env.NODE_ENV === 'production') {
        browser.tabs.executeScript(tabId, {
            file: `/js/${name}.bundle.js`,
            runAt: 'document_end'
        }, cb);
    } else {
        // dev: async fetch bundle
        fetch(`http://localhost:3000/js/${name}.bundle.js`)
            .then(res => res.text())
            .then((fetchRes) => {
                browser.tabs.executeScript(tabId, { code: fetchRes, runAt: 'document_end' }, cb);
            });
    }
}

const arrowURLs = ['^https://github\\.com'];

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== 'loading' || !tab.url.match(arrowURLs.join('|'))) return;

    loadScript('inject', tabId, () => console.log('giphub init'));
});

browser.runtime.onMessage.addListener(({ searchTerm, limit, offset }, sender, sendMessage) => {
    const xhrPromise = fetch(`https://api.giphy.com/v1/gifs/search?q=${encodeURI(searchTerm)}&offset=${offset}&limit=${limit}&api_key=dc6zaTOxFJmzC`);
    xhrPromise.then((res) => {
        res.json().then((json) => {
            sendMessage({
                status: res.status,
                json,
            });
        });
    });
    return true;
});
