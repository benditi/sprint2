'use strict';

var gCanvas;
var gCtx;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];


function init() {
    createImages(18);
    renderGallery();
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d');
}

function initCanvas() {
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    drawText(currLine.txt, currLine.xline, currLine.yline);
    let currTxt = gMeme.lines[gMeme.selectedLineIdx].txt;
    document.querySelector('input').value = currTxt;
    focusInput();
    const input = document.querySelector('input');
    getMobileChange();
    //listeners
    input.addEventListener('input', onEditTxt);
    // window.addEventListener('resize', resizeCanvas);
    addMouseListeners();
    addTouchListeners();
}

function renderGallery() {
    let strHtmls = gImgs.map(function(img) {
        return `<img class="img${img.id}" src="./meme-imgs/${img.id}.jpg" alt="" onclick="goToEditor(${img.id})">`
    });
    let elGallery = document.querySelector('.image-gallery');
    elGallery.innerHTML = strHtmls.join('');
}

//prints canvas with image and all saved lines
function reOrderCanvas() {
    clearCanvas();
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
//prints canvas without rectangular
function reOrderwithout() {
    clearCanvas();
    renderImg(gMeme.selectedImgId);
    let currLineIdx = gMeme.selectedLineIdx
    let lines = gMeme.lines;
    lines.forEach((line, idx) => {
        gMeme.selectedLineIdx = idx;
        drawText(line.txt, line.xline, line.yline)
    });
    gMeme.selectedLineIdx = currLineIdx;
}
// changes canvas size and line properties when screen width changes at specific breakpoint
function resizeCanvas() {
    var iWidth = document.documentElement.clientWidth;
    if (iWidth > 970) {
        gCanvas.height = 450;
        gCanvas.width = 450;
        reOrderCanvas();
    } else if (iWidth <= 970 && iWidth > 718) {
        gCanvas.height = 370;
        gCanvas.width = 370;
        gMeme.lines[0].size = 25;
        gMeme.lines[0].yline = 300;
        gSize = 25;
        gRectXDiff = 250;
        gRectHeightD = -10;
        reOrderCanvas();

    } else if (iWidth <= 880) {
        gCanvas.height = 330;
        gCanvas.width = 330;
        gMeme.lines[0].size = 25;
        gMeme.lines[0].yline = 300;
        gSize = 25;
        gRectXDiff = 250;
        gRectHeightD = -10;
        reOrderCanvas();
    }
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
    focusInput();
}

function onDeleteMeme() {
    if (gMeme.lines.length === 1) return;
    gMeme.lines.pop();
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    reOrderCanvas();
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    let newTxt = currLine.txt;
    document.querySelector('input.curr-txt').value = newTxt;
    focusInput();
}

function onSwitch() {
    let txt = switchLine();
    document.querySelector('input.curr-txt').value = txt;
    focusInput();
}

function onMoveLine(num) {
    moveLineUpDown(num);
}

function onSaveCanvas() {
    uploadImg();
    showMessage();
}

function goToEditor(imgID) {
    document.querySelector('.image-gallery').style.display = 'none';
    document.querySelector('.editor-container').style.display = 'flex';
    gMeme.selectedImgId = imgID;
    renderImg(imgID);
    initCanvas();
}

function goToGall() {
    document.querySelector('.editor-container').style.display = 'none';
    document.querySelector('.saved-gallery').style.display = 'none';
    document.querySelector('.image-gallery').style.display = 'grid';
    zeroMemesLines();
}

function showMessage() {
    let elMessage = document.querySelector('.message-pop');
    elMessage.style.display = 'block';
    setTimeout(function() {
        let elMemesNav = document.querySelector('.memes-nav');
        highlight(elMemesNav);
        elMessage.style.display = 'none';
    }, 1500);
}

function highlight(obj) {
    obj.classList.toggle('highlite');
    setTimeout(function() {
        obj.classList.toggle('highlite');
    }, 1500);
}

function focusInput() {
    document.querySelector('input').focus();
}

//Grab Line functions

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!getLineDragged(pos)) return;
    gMeme.lines[gMeme.selectedLineIdx].isDrag = true;
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
    let draggedLine = gMeme.lines[gMeme.selectedLineIdx];
    if (!draggedLine) return;
    if (draggedLine.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        draggedLine.xline += dx;
        draggedLine.yline += dy;
        gStartPos = pos
        reOrderCanvas();
    }
}

function onUp() {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = false;
    document.body.style.cursor = 'grab';
    setTimeout(function() {
        document.body.style.cursor = 'auto';
    }, 300)
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

//Memes Gallery functions
function goToMemes() {
    document.querySelector('.editor-container').style.display = 'none';
    document.querySelector('.image-gallery').style.display = 'none';
    document.querySelector('.saved-gallery').style.display = 'grid';
    let storedImgs = loadFromStorage(KEY);
    let strHtmls = storedImgs.map((image, idx) => {
        return `<img name="img${idx}" src="${image}">`
    });
    document.querySelector('.saved-gallery').innerHTML = strHtmls.join('');
}