chrome.browserAction.onClicked.addListener(function() {
    var uri = '/option.html';
    chrome.tabs.create({url: uri});
});

