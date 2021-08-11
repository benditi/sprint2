'use strict';

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        size: 40,
        align: 'left',
        color: 'red',
        fontfamily: 'mpact'
    }]
}

function getCurrImg() {
    return gMeme.selectedImgId;
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
    console.log(color);
}