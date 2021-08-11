'use strict';

var gCanvas;
var gCtx;

function init() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d');
    renderImg();
    drawText('Hello', 50, 50);

    //addListeners();
}

function renderImg() {
    let imgID = getCurrImg();
    let elImg = document.querySelector(`.img${imgID.toString()}`);
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

function onSetColor() {
    setColor(color.value)
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