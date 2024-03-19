rules = document.querySelector('.rules')
rbtn = document.querySelector('.rules-btn')
cbtn = document.getElementById('close-btn')
canvas = document.getElemtntById('canvas')
ctx = canvas.getContext('2d')

// Create ball properties
ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4;
    dy: -4;

}

// Draw ball on canvas
function drawBall() {
    
}



// RUles open and close event handlers
rbtn.addEventListener('click', () => {
    rules.classList.add('show')
})

cbtn.addEventListener('click', () => {
    rules.classList.remove('show')
})



