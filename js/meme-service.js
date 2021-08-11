'use strict';

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        size: 40,
        align: 'left',
        color: 'red',
        fontfamily: 'mpact',
        xline: 0,
        yline: 0,
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

function getCurrImg() {
    return gMeme.selectedImgId;
}

function setColor(color) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.color = color;
    reorderCanvas()
    drawText(currLine.txt, currLine.xline, currLine.yline)
}

function setFont(font) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.fontfamily = font;
    reorderCanvas()
    drawText(currLine.txt, currLine.xline, currLine.yline)
}

function setFontSize(num) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.size += num;
    reorderCanvas()
    drawText(currLine.txt, currLine.xline, currLine.yline)
}

function editText(txt) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.txt = txt;
    reorderCanvas()
    drawText(currLine.txt, currLine.xline, currLine.yline)
}

function createNewLine(txt) {
    let newLine = {
        txt: txt,
        size: 60,
        align: 'left',
        color: 'white',
        fontfamily: 'mpact',
        xline: 0,
        yline: 40,
    }
    gMeme.lines.push(newLine);
    gMeme.selectedLineIdx++;
    drawText(newLine.txt, newLine.xline, newLine.yline);
}