
const ALL_WORDS = 2315;
const divFocus = $('.letterInput');
const keys = $('.keyboardKey').toArray();
let validGuesses = [];
let everyWord = []
let wordToFind = '';
let wordAttempt = '';
let attemptNo = 0;
let workingDivs = [];
let divIdIndex = 0;


// function to select a word as the correct answer
function randomNum() {
    let index = Math.floor(Math.random() * (ALL_WORDS + 1));

    $.get('./data/wordle-answers-alphabetical.txt', function (data) {
        everyWord = data.split("\n");
        wordToFind = everyWord[index]
        // take out before adding to vercel - no cheating on my watch
        console.log(wordToFind)
    }, 'text');

    $.get('./data/valid-wordle-words.txt', function (data) {
        validGuesses = data.split("\n");
    }, 'text');
}
randomNum();



$(keys).on('click', function () {
    switch ($(this).val()) {
        case 'enter':
            handleEnter();
            break;

        case 'back':
            handleBackspace();
            break;

        default:
            handleAddLetter($(this).val())
            break;
    }
})






$(document).keypress(function (e) {
    if (e.which !== 13 && e.which !== 8) {
        handleAddLetter(e.key)

    }
});



// keydown function handles enter and backspace
$(document).keydown(function (e) {
    switch (e.which) {
        case 13:
            handleEnter();
            break;
        case 8:
            handleBackspace();
            break;
    }
})


const handleBackspace = () => {
    if (wordAttempt.length > 0) {
        wordAttempt = wordAttempt.slice(0, -1)
        $(divFocus[divIdIndex]).removeClass('addLetter')
        divIdIndex--
        $(divFocus[divIdIndex]).removeClass('addLetter')
        workingDivs.splice(-1, 1)
        $(divFocus[divIdIndex]).empty();
    }
}



const handleEnter = () => {
    if ($.inArray(wordAttempt.toLowerCase(), validGuesses) !== -1) {
        checkAnswer(wordAttempt);
        wordAttempt = '';
        attemptNo++;

    } else {
        $(workingDivs[0]).parent().addClass('wrongAnswer')
        workingDivs = [];

    }
    setTimeout(() => {
        $(workingDivs[0]).parent().removeClass('wrongAnswer')
    }, 1000)
}



const handleAddLetter = (letter) => {
    if (wordAttempt.length < 5) {
        $(divFocus[divIdIndex]).text(letter.toUpperCase());
        $(divFocus[divIdIndex]).addClass('addLetter');
        workingDivs.push('#' + divFocus[divIdIndex].id)

        wordAttempt += letter;

        divIdIndex++;
    } else {
        console.log('At yer limit, pardner');
    }
}


const handleColorCoding = (word) => {
    for (let i = 0; i < word.length; i++) {
        if (word[i] === wordToFind[i]) {
            $(workingDivs[i]).addClass('correctGuess')

            for (let j = 0; j < keys.length; j++) {
                if (keys[j].value === word[i]) {
                    $(keys[j]).removeClass('correctGuess closeGuess wrongGuess')
                    $(keys[j]).addClass('correctGuess')
                }
            }

        } else if (wordToFind.includes(word[i])) {
            $(workingDivs[i]).addClass('closeGuess');

            for (let j = 0; j < keys.length; j++) {
                if (keys[j].value === word[i]) {
                    $(keys[j]).removeClass('correctGuess closeGuess wrongGuess')
                    $(keys[j]).addClass('closeGuess')
                }
            }

        } else {
            $(workingDivs[i]).addClass('wrongGuess');

            for (let j = 0; j < keys.length; j++) {
                if (keys[j].value === word[i]) {
                    $(keys[j]).removeClass('correctGuess closeGuess wrongGuess')
                    $(keys[j]).addClass('wrongGuess')
                }
            }
        }
    }
}


const checkAnswer = (word) => {

    switch (word === wordToFind) {
        case false:
            console.log(attemptNo)
            if (attemptNo < 5) {
                handleColorCoding(wordAttempt);
            } else {
                handleColorCoding(wordAttempt);
                celebration(false)
            }

            workingDivs = [];
            break
            ;
        case true:
            console.log(attemptNo)

            for (let i = 0; i < workingDivs.length; i++) {
                $(workingDivs[i]).addClass('correctGuess hellYeah')
            }
            celebration(true);

            break;
    }
}

const celebration = (w) => {
    switch (w) {
        case true:
            setTimeout(() => {
                $('#modalContent').html('Congrats! You correctly guessed the word.<br/>Click Close to review your game, or Play Again for another game.')
                $('#winModal').addClass('modalSeen')
            }, 1000)

            break;
        case false:
            setTimeout(() => {
                $('#modalContent').html('Sorry, you lost this game.<br/>Click Close to review your game, or Play Again for another game.')
                $('#winModal').addClass('modalSeen')
            }, 1000)
            break;
    }
}


$('#playAgain').on('click', function () {
    wordAttempt = '';
    workingDivs = [];
    divIdIndex = 0;
    attemptNo = 0;
    // next word is selected
    randomNum();
    // modal is hidden again
    $('#modalContent').empty();
    $('#winModal').removeClass('modalSeen')

    for (let i = 0; i < divFocus.length; i++) {
        $(divFocus[i]).empty()
        $(divFocus[i]).removeClass('correctGuess wrongGuess closeGuess addLetter');
    }

    for (let j = 0; j < keys.length; j++) {
        $(keys[j]).removeClass('correctGuess wrongGuess closeGuess')
    }
})


$('#exitModal').on('click', function () {
    $('#modalContent').empty();
    $('#winModal').removeClass('modalSeen')
})