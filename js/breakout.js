rules = document.querySelector('.rules')
rbtn = document.querySelector('.rules-btn')
cbtn = document.getElementById('close-btn')

// RUles open and close event handlers
rbtn.addEventListener('click', () => {
    rules.classList.add('show')
})

cbtn.addEventListener('click', () => {
    rules.classList.remove('show')
})



