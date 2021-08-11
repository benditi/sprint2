'use strict';

var gCanvas;
var gCtx;

function init() {
    renderGallery();
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d');
}

function initCanvas() {
    drawText(gMeme.lines[gMeme.selectedLineIdx].txt, 50, 400);
    let currTxt = gMeme.lines[gMeme.selectedLineIdx].txt;
    document.querySelector('input').value = currTxt;
    const input = document.querySelector('input');
    //listeners
    input.addEventListener('input', onEditTxt);
}

function renderGallery() {
    let strHtmls = gImgs.map(function(img) {
        return `<img class="img${img.id}" src="./meme-imgs/${img.id}.jpg" alt="" onclick="goToEditor(${img.id})">`
    });
    let elGallery = document.querySelector('.image-gallery');
    elGallery.innerHTML = strHtmls.join('');
}

function reorderCanvas() {
    clearCanvas()
    renderImg(gMeme.selectedImgId);
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

function onUpdateInput(e) {
    let newTxt = e.target.value;
    createNewLine(newTxt);
}

function goToEditor(imgID) {
    document.querySelector('.image-gallery').style.display = 'none';
    document.querySelector('.editor-container').style.display = 'block';
    gMeme.selectedImgId = imgID;
    renderImg(imgID);
    initCanvas();
}


// Image Section
// function onImgInput(ev) {
//     debugger;
//     loadImageFromInput(ev, renderImg)
// }

// function loadImageFromInput(ev, onImageReady) {
// document.querySelector('.share-container').innerHTML = ''
//     var reader = new FileReader()

//     reader.onload = function(event) {
//         var img = new Image()
//         img.onload = onImageReady.bind(null, img)
//         img.src = event.target.result
//     }
//     reader.readAsDataURL(ev.target.files[0])
// }


// function renderImg(img) {
//     gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
// }