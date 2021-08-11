'use strict';

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        size: 40,
        align: 'left',
        color: 'white',
        fontfamily: 'mpact',
        xline: 50,
        yline: 400,
    }]
}

var gImgs = [{
        id: 1,
        url: './meme-imgs/1.jpg',
        keywords: ['angry']
    },
    {
        id: 2,
        url: './meme-imgs/2.jpg',
        keywords: ['love', 'happy']
    }
];

function plusOneIdx() {
    gMeme.selectedLineIdx++;
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
    reOrderCanvas()
    drawText(currLine.txt, currLine.xline, currLine.yline)
}

function editText(txt) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.txt = txt;
    reOrderCanvas()
        // drawText(currLine.txt, currLine.xline, currLine.yline)
}

function createNewLine() {
    let newLine = {
        txt: '',
        size: 40,
        align: 'left',
        color: 'white',
        fontfamily: 'mpact',
        xline: 50,
        yline: 100 + ((gMeme.lines.length - 1) * 40),
    };
    gMeme.lines.push(newLine);
    plusOneIdx();
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