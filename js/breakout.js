rules = document.querySelector('.rules')
rbtn = document.querySelector('.rules-btn')
cbtn = document.getElementById('close-btn')

canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')

// Create ball properties
ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
}

// Create Paddle properties
paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height -20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
}
// Draw ball on canvas
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = '#6163c2'
    ctx.fill()
    ctx.closePath()
}

drawBall()



// RUles open and close event handlers
rbtn.addEventListener('click', () => {
    rules.classList.add('show')
})

cbtn.addEventListener('click', () => {
    rules.classList.remove('show')
})



