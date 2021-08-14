var KEY = 'canvasDB';
var gSavedMemes;

function uploadImg() {
    _createMemes();
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");
    gSavedMemes.push(imgDataUrl);
    saveToStorage(KEY, gSavedMemes);
}

function _createMemes() {
    gSavedMemes = loadFromStorage(KEY);
    if (!gSavedMemes || !gSavedMemes.length) {
        gSavedMemes = [];
    }
}