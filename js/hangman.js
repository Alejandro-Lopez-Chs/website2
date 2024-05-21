const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const figureParts = document.querySelectorAll('.figure-part')

const word = ['application', 'programming', 'interface', 'wizard', 'antidisestablishmentarianism', 'jazz', 'babylon',]

var end = true
let selectedIndex = Math.floor(word.length * Math.random())
let selectedWord = word[selectedIndex]

const correctLetters = []
const wrongLetters = []



// Show hidden word
function displayWord(end) {
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </span>
        ` ).join('')
    }
  `
    const innerWord = wordEl.innerText.replace(/\n/g, '')

    //check if won
    if (innerWord == selectedWord) {

        finalMessage.innerText = "Congratuslations! You won!"
        answer.innerText = ""
        popup.style.display = 'flex'
        end = false
        console.log(end)
    }


}

// Update the wrong letters
function updateWrongLettersEl(end) {
    wrongLettersEl.innerHTML = `
      ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
      ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `


    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length

        if (index < errors) {
            part.style.display = 'block'
        } else {
            part.style.display = 'none'
        }
    })
    //check if lost
if (wrongLetters.length == figureParts.length) {

    finalMessage.innerText = 'Unfortunately you lost! The correct answer is...'
    answer.innerText = selectedWord
    popup.style.display = 'flex'
    end = false
    console.log(end)
    }

}


// Show Notification
function showNotification() {
    notification.classList.add('show')

    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}

console.log(end)
// Keydown letter press
window.addEventListener('keydown', e => {

    if (end == true){
    if (e.keyCode >= 65 && e.keyCode <=90) {
        const letter = e.key

        if (selectedWord.includes(letter)) {
            if( !correctLetters.includes(letter)) {
                correctLetters.push(letter)

                displayWord(end)
            } else {
                showNotification()
            }
        }  else {
            if ( !wrongLetters.includes(letter)) {
                wrongLetters.push(letter)

                updateWrongLettersEl(end)
            } else {
                showNotification()
            }
        }

    }
})
}



//Restart game and play again
playAgainBtn.addEventListener('click', () => {
    correctLetters.length = 0
    wrongLetters.length = 0

    selectedIndex = Math.floor(word.length * Math.random())
    selectedWord = word[selectedIndex]

    displayWord()

    updateWrongLettersEl()


    popup.style.display = 'none'
})

displayWord()
