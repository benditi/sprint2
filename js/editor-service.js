'use strict';
var gRectXDiff = 400;
var gRectYDiff = 0;
var gRectHeightD = 0;

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
    const sy = y - 50 - gRectYDiff;
    const rectW = gRectXDiff + 5;
    const rectH = 80 + gRectHeightD;
    gCtx.rect(sx, sy, rectW, rectH)
    gCtx.fillStyle = 'rgba(214, 207, 207, 0.034)';
    gCtx.fillRect(sx, sy, rectW, rectH)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function isRectangleClicked(clickedPos, currLine) {
    let x = currLine.xline;
    let y = currLine.yline;
    if ((x - 5 <= clickedPos.x) && (clickedPos.x <= x + gRectXDiff) && (y - 50 <= clickedPos.y) &&
        (clickedPos.y <= y + 30)) {
        return true;
    } else return false;
}

function getLineDragged(clickedPos) {
    let lineIdx = gMeme.lines.findIndex(line =>
        (isRectangleClicked(clickedPos, line))
    );
    if (lineIdx === -1) return;
    gMeme.selectedLineIdx = lineIdx;
    return gMeme.lines[lineIdx];
}