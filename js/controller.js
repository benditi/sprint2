'use strict';

var gCanvas;
var gCtx;

function init() {
    renderGallery();
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d');
}

function initCanvas() {
    debugger;

    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    drawText(currLine.txt, currLine.xline, currLine.yline);
    let currTxt = gMeme.lines[gMeme.selectedLineIdx].txt;
    document.querySelector('input').value = currTxt;
    const input = document.querySelector('input');
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
    clearCanvas()
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
    var elContainer = document.querySelector('.main-container');
    // Note: changing the canvas dimension this way clears the canvas
    let wi = window.innerWidth;
    if (wi <= 718) {
        gCanvas.height = 350;
        gCanvas.width = 350;
        gMeme.lines[0].size = 25;
        gMeme.lines[0].yline = 300;
        gSize = 25;


    } else {
        gCanvas.width = elContainer.offsetWidth - 560
    }

    console.log(wi);
    // Unless needed, better keep height fixed.
    // gCanvas.height = elContainer.offsetHeight - 400
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