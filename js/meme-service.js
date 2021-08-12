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
    }]
}

var gImgs = [
    // {
    //     id: 1,
    //     url: './meme-imgs/1.jpg',
    //     keywords: ['angry']
    // },
    // {
    //     id: 2,
    //     url: './meme-imgs/2.jpg',
    //     keywords: ['love', 'happy']
    // }
];

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


function getMobileChange() {
    var iWidth = document.documentElement.clientWidth;
    if (iWidth <= 718) {
        gCanvas.height = 350;
        gCanvas.width = 350;
        gMeme.lines[0].size = 25;
        gMeme.lines[0].yline = 300;
        gSize = 25;
        gDiffRect = 250;
        reOrderCanvas();
    }
}

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
        size: gSize,
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

function moveLineUpDown(num) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.yline += num;
    reOrderCanvas();
}