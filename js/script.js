const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrectLetters = [], correctLetters = [];

function randomWord() 
{
    //getting ramdom object from wordlist
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;    //getting word of random object
    //setting the hints and other values
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; 
    incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;

    let html = "";
    for (let i = 0; i < word.length; i++) 
    {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}
randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) 
    {
        if(word.includes(key)) 
        { //if user given letter found in the word
            for (let i = 0; i < word.length; i++) 
            {
                if(word[i] == key) 
                {
                    //showing the matched letter in the input values
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } 
        else 
        {
            maxGuesses--;                               //decrement maximum guess by one
            incorrectLetters.push(` ${key}`);           //push the incorrect letter in the array so that the user can't input it second time
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;       //show the wrong inputs
    }
    typingInput.value = "";                             //cleans the input-typing box once it is checked

    setTimeout(() => 
    {
        if(correctLetters.length === word.length)      //if user found all the letters  
        {
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            return randomWord();                       //calling randomWord(), so the game resets
        } 
        else if(maxGuesses < 1)                        //if user couldn't find all letters
        {
            alert("Game over! You don't have remaining guesses");
            //show all letters in the input
            for(let i = 0; i < word.length; i++) 
            {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());