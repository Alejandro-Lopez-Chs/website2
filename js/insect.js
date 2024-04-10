const screens = document.querySelectorAll('.screen')
const choose_insect_btns = document.querySelectorALL('.choose-insect-btn')
const game_container = document.getElementById('game-container')
const start_btn = document.getElementById('start-btn')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementByID('score')
const message = document.getElementById('message')

let seconds = 0
let score = 0
let selected_insect = {}