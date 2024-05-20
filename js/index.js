btn = document.getElementById('intro-btn')
audio = document.getElementById('arcade')
btn.addEventListener('click', () => {
    document.body.style.backgroundColor = '#011d4a'
    btn.classList.add('active')
    audio.play();
})
