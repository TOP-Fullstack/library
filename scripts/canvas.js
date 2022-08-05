// Initialize the canvas, set it equal to the size of the browser window
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Create clouds object to set a standard height + weight for each cloud
let clouds = {
    0: {
        width: 270,
        height: 180
    },
    1: {
        width: 120,
        height: 80
    },
    2: {
        width: 150,
        height: 80
    }
}

// Preload all cloud images before drawing on the canvas
const cloudLinks = [
    'img/cloud.png',
    'img/cloud1.png',
    'img/cloud2.png',
]

let cloudImages = [];
let preloadCounter = 0;

function init() {

    cloudImages[preloadCounter] = new Image();
    cloudImages[preloadCounter].src = cloudLinks[preloadCounter];
    cloudImages[preloadCounter].onload = function () {

        preloadCounter++;

        if (preloadCounter != cloudLinks.length) init()
        else { draw() };

    }
}


function draw() {

    // Fill the background
    ctx.fillStyle = '#b5e2e1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Place a certain number amount of clouds randomly across the canvas based on the size of the browser window
    let numOfClouds;
    if (canvas.width > 1280) numOfClouds = 20;
    else if (canvas.width < 1280 && canvas.width >= 780) numOfClouds = 10;
    else numOfClouds = 5;

    for (let i = 0; i < numOfClouds; i++) {

        let randomCloud = Math.floor(Math.random() * cloudLinks.length);
        let randomX = Math.floor(Math.random() * (canvas.width - clouds[randomCloud].width));
        let randomY = Math.floor(Math.random() * (canvas.height - clouds[randomCloud].height));

        ctx.drawImage(cloudImages[randomCloud], randomX, randomY, clouds[randomCloud].width, clouds[randomCloud].height);

    }

}

init();
