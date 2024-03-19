rules = document.querySelector('.rules')
rbtn = document.querySelector('.rules-btn')
cbtn = document.querySelector('.close-btn')


rbtn.addEventListener('click', () => {
    rules.classList.add('show')
})

cbtn.addEventListener('click', () => {
    rules.classList.remove('show')
})



