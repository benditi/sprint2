'use strict';

var gSize = 40;
var gYstart = 400;
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        size: 40,
        align: 'left',
        color: 'white',
        fontfamily: 'mpact',
        xline: 40,
        yline: 400,
        isDrag: false
    }]
}

var gImgs = [];

function createImg(idx) {
    return {
        id: idx,
        url: `./meme-imgs/${idx}.jpg`,
        keywords: ['love', 'smile']
    }
}

function createImages(num) {
    for (var i = 1; i < num + 1; i++) {
        let img = createImg(i);
        gImgs.push(img);
    }
}

//Sets mobile properties when user logs in directly from a mobile
function getMobileChange() {
    var iWidth = document.documentElement.clientWidth;
    if (iWidth <= 718) {
        gCanvas.height = 330;
        gCanvas.width = 330;
        gMeme.lines[0].size = 25;
        gMeme.lines[0].yline = 300;
        gSize = 25;
        gDiffRect = 250;
        reOrderCanvas();
    }
}

function getCurrImg() {
    return gMeme.selectedImgId;
}

function setColor(color) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.color = color;
    reOrderCanvas()
    drawText(currLine.txt, currLine.xline, currLine.yline)
}

function setFont(font) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.fontfamily = font;
    reOrderCanvas()
    drawText(currLine.txt, currLine.xline, currLine.yline)
}

function setFontSize(num) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.size += num;
    gHiRect += num * 1.5;
    reOrderCanvas()
    drawText(currLine.txt, currLine.xline, currLine.yline)
}

function editText(txt) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.txt = txt;
    reOrderCanvas()
}

function createNewLine() {
    let newLine = {
        txt: '',
        size: gSize,
        align: 'left',
        color: 'white',
        fontfamily: 'mpact',
        xline: 50,
        yline: 100 + ((gMeme.lines.length - 1) * 60),
        isDrag: false
    };
    gMeme.lines.push(newLine);
    gMeme.selectedLineIdx++;
}

function switchLine() {
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
    }
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    reOrderCanvas();
    let txt = currLine.txt;
    return txt;
}

function moveLineUpDown(num) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.yline += num;
    reOrderCanvas();
}

function zeroMemesLines() {
    gMeme.lines.splice(1);
    gMeme.lines[0].txt = 'I never eat Falafel';
    gMeme.lines[0].size = 40;
    gMeme.lines[0].xline = 40;
    gMeme.lines[0].yline = 400;
    gMeme.lines[0].color = 'white';
    gMeme.lines[0].fontfamily = 'mpact';
    gMeme.selectedLineIdx = 0;
    getMobileChange();
}