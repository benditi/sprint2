'use strict';

var gCanvas;
var gCtx;
var gIsDrag = false;

function init() {
    createImages(18);
    renderGallery();
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d');
}

function initCanvas() {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    drawText(currLine.txt, currLine.xline, currLine.yline);
    let currTxt = gMeme.lines[gMeme.selectedLineIdx].txt;
    document.querySelector('input').value = currTxt;
    const input = document.querySelector('input');
    getMobileChange();
    //listeners
    input.addEventListener('input', onEditTxt);
    window.addEventListener('resize', resizeCanvas);
}

function renderGallery() {
    let strHtmls = gImgs.map(function(img) {
        return `<img class="img${img.id}" src="./meme-imgs/${img.id}.jpg" alt="" onclick="goToEditor(${img.id})">`
    });
    let elGallery = document.querySelector('.image-gallery');
    elGallery.innerHTML = strHtmls.join('');
}

function reOrderCanvas() {
    clearCanvas();
    renderImg(gMeme.selectedImgId);
    let currLineIdx = gMeme.selectedLineIdx
    let lines = gMeme.lines;
    lines.forEach((line, idx) => {
        gMeme.selectedLineIdx = idx;
        drawText(line.txt, line.xline, line.yline)
    });
    gMeme.selectedLineIdx = currLineIdx;
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    let x = currLine.xline;
    let y = currLine.yline;
    drawRect(x, y);

}

function resizeCanvas() {
    // Note: changing the canvas dimension this way clears the canvas
    if (window.matchMedia("(min-width: 718px)").matches) {
        gCanvas.height = 350;
        gCanvas.width = 350;
        gMeme.lines[0].size = 25;
        gMeme.lines[0].yline = 300;
        gSize = 25;
        gDiffRect = 250;
    }
    // Unless needed, better keep height fixed.
    reOrderCanvas();
}

function renderImg(imgID) {
    let elImg = document.querySelector(`.img${imgID.toString()}`);
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function onSetColor() {
    setColor(color.value);
}

function onSetFont() {
    setFont(font.value);
}

function onFontGrow(num) {
    setFontSize(num);
}

function onEditTxt(e) {
    let newTxt = e.target.value;
    editText(newTxt);
}

function onCreateNewLine() {
    createNewLine();
    reOrderCanvas();
    let newTxt = document.querySelector('input.curr-txt').value;
    newTxt = '';
    document.querySelector('input.curr-txt').value = newTxt;

}

function goToEditor(imgID) {
    document.querySelector('.image-gallery').style.display = 'none';
    document.querySelector('.editor-container').style.display = 'flex';
    gMeme.selectedImgId = imgID;
    renderImg(imgID);
    initCanvas();
}

function onSwitch() {
    let txt = switchLine();
    document.querySelector('input.curr-txt').value = txt;
}

function onMove(num) {
    moveLineUpDown(num);
}

function backtoGall() {
    document.querySelector('.editor-container').style.display = 'none';
    document.querySelector('.image-gallery').style.display = 'grid';
    gMeme.lines.splice(1);
    gMeme.lines[0].txt = 'I never eat Falafel';
    gMeme.selectedLineIdx = 0;
}