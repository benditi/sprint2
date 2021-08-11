'use strict';

function drawText(txt, x, y) {
    let currLine = gMeme.lines[gMeme.selectedLineIdx]
    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = currLine.color;
    gCtx.font = `${currLine.size}px ${currLine.fontfamily}`
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
    currLine.xline = x;
    currLine.yline = y;

}