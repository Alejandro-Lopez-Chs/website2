rules = document.querySelector('.rules')
rbtn = document.querySelector('.rules-btn')
cbtn = document.getElementById('close-btn')
pbtn = document.getElementById('playbtn')
dbtn = document.getElementById('daybtn')
nbtn = document.getElementById('nightbtn')

dbtn.addEventListener('click', () => {
    daybtn.classList.add('active')
    nightbtn.classList.remove('active')
    document.body.style.backgroundColor = '#c399cf'
    canvas.classList.remove('night')
    playbtn.classList.remove('night')
})

nbtn.addEventListener('click', () => {
    daybtn.classList.remove('active')
    nightbtn.classList.add('active')
    document.body.style.backgroundColor = '#46374a'
    canvas.classList.add('night')
    playbtn.classList.add('night')
    nightdraw()
})

pbtn.addEventListener('click', () => {
    update()
}, { once: true })

pbtn.addEventListener('click', () => {
    Ballstart()
    showAllBrick()
    score = 0
    playbtn.classList.add('active')
})

canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')

score = 0

brickRowCount = 9
brickColumnCount =5


// Create properties
ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 8,
    dx: 4,
    dy: -4,
}

// Create Paddle properties
paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height -20,
    w: 85,
    h: 10,
    speed: 8,
    dx: 0,
}

//Create brick properties
brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,
}

// Create bricks
bricks = []
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = []
    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
        bricks[i][j] = {x, y, ...brickInfo}
    }

}
// Draw ball on canvas
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = '#6163c2'
    ctx.fill()
    ctx.closePath()
}

function nightBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = '#a2cc41'
    ctx.fill()
    ctx.closePath()
}

//Draw Paddle on canvas
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#6163c2'
    ctx.fill()
    ctx.closePath()
}

function nightPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#52a35c'
    ctx.fill()
    ctx.closePath()
}



//Draw Score on canvasa
function drawScore() {
    ctx.font = '20px Arial'
    ctx.fillText(`Score: ${score}`, canvas.width-100, 30)
}


// Draw bricks on canvas
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill()
            ctx.closePath()
        })
    })
}

function nightBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle = brick.visible ? '#29353b' : 'transparent';
            ctx.fill()
            ctx.closePath()
        })
    })
}
console.log(bricks)

//Draw everything
function draw()
{
    ctx.clearRect(0,0,canvas.width, canvas.height)
    drawBall()
    drawPaddle()
    drawScore()
    drawBricks()
}

function nightdraw()
{

    nightBall()
    nightPaddle()
    nightBricks()
}

// Move paddle on canvas
function movePaddle() {
    paddle.x = paddle.x + paddle.dx

    // wall detection
    if (paddle.x < 0) {
        paddle.x = 0
    }
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w
    }
}

// Keydown Event
function keyDown (e) {
   //  console.log(e.key)
   if (e.key == 'ArrowRight' || e.key == 'Right') {
    paddle.dx = paddle.speed
   }
   if (e.key == 'ArrowLeft' || e.key == 'Left') {
    paddle.dx = -paddle.speed
   }
}

// Keydown Event
function keyUp(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'ArrowLeft' || e.key == 'Left') {
        paddle.dx = 0
    }
}
// Keyboard event hadndlers
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

function moveBall () {
    ball.x = ball.x + ball.dx
    ball.y = ball.y + ball.dy

    //wall collision (top)
    if (ball.y + ball.size < 0) {
        ball.dy = -1 * ball.dy
    }

    // wall collision (right)
    if (ball.x + ball.size > canvas.width) {
        ball.dx = -1 * ball.dx
    }

     //wall collision (bottom)
     if (ball.y + ball.size > canvas.height) {
        ball.dy = 0
        ball.dx = 0
        playbtn.classList.remove('active')
        paddlestop()

    }

    //wall collision (left)
    if (ball.x + ball.size < 0) {
        ball.dx = -1 * ball.dx
    }

    //paddle collision
    if (
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ) {
        ball.dy = -1 * ball.speed
    }

    //Brick collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (
                    ball.x - ball.size > brick.x && //Left brick side
                    ball.x + ball.size < brick.x + brick.w && //right
                    ball.y + ball.size > brick.y && // top
                    ball.y - ball.size < brick.y + brick.h //bottom
                ) {
                    ball.dy = -1 * ball.dy
                    brick.visible = false
                    increaseScore()
                }
            }
        })
    })
}


//increase score
function increaseScore() {
    score++ //score = score + 1

    if (score == brickRowCount * brickColumnCount) {
        score = 0
        showAllBrick()
    }
}

function showAllBrick() {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true
        })
    })
}

function Ballstart() {
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
    ball.dx = 4
    ball.dy = -4
    ball.speed = 6
}
function paddlestop() {
    paddle.dx = 0
}
// update canvas drawing and animatino
   function update() {
    moveBall()
    movePaddle()
    draw()
    requestAnimationFrame(update)
   }





// RUles open and close event handlers
rbtn.addEventListener('click', () => {
    rules.classList.add('show')
})

cbtn.addEventListener('click', () => {
    rules.classList.remove('show')
})



