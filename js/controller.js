'use strict';

var gCanvas;
var gCtx;

function init() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d');
    renderImg();
    drawText(gMeme.lines[gMeme.selectedLineIdx].txt, 50, 400);
    let currTxt = gMeme.lines[gMeme.selectedLineIdx].txt;
    document.querySelector('input').value = currTxt;
    const input = document.querySelector('input');
    input.addEventListener('input', onEditTxt);

    //addListeners();
}

function renderCanvas() {
    clearCanvas()
    renderImg();
}

function renderImg() {
    let imgID = getCurrImg();
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