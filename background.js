createHTMLcntextmenu = chrome.contextMenus.create(
    { "title": "InstantNoteTaker" },
    function () {
        if (chrome.runtime.lastError) {
            console.error("Error occured");
        }
    }
);
chrome.contextMenus.onClicked.addListener(locationchanger);
function locationchanger() {
    var newURL = "https://devulapallisai.github.io/InstantNoteTaker/Note.html";
    chrome.tabs.create(
        { url: newURL }
    );
}