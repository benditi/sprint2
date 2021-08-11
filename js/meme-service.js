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

function getCurrImg() {
    return gMeme.selectedImgId;
}

function setColor(color) {
    debugger;
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.color = color;
    console.log(color);
    renderCanvas()
    drawText(currLine.txt, currLine.xline, currLine.yline)
}

function setFont(font) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.fontfamily = font;
    console.log(font);
    renderCanvas()
    drawText(currLine.txt, currLine.xline, currLine.yline)
}

function setFontSize(num) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.size += num;
    renderCanvas()
    drawText(currLine.txt, currLine.xline, currLine.yline)
}

function editText(txt) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.txt = txt;
    renderCanvas()
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