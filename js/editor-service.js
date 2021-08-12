'use strict';
var gDiffRect = 300;

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

function drawRect(x, y) {
    gCtx.beginPath()
    const sx = x - 5;
    const sy = y - 50;
    const ex = x + gDiffRect;
    const ey = y + 30;
    const dx = ex - sx;
    const dy = ey - sy;
    gCtx.rect(sx, sy, dx, dy)
    gCtx.fillStyle = 'rgba(214, 207, 207, 0.034)';
    gCtx.fillRect(sx, sy, dx, dy)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}