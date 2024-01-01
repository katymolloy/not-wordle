
const divFocus = $('.letterInput');
const keys = $('.keyboardKey').toArray();
var validGuesses = [];
var everyWord = []
var wordToFind = '';
var wordAttempt = '';
var attemptNo = 0;
var workingDivs = [];
var divIdIndex = 0;



function randomNum() {

    const ALL_WORDS = 2315;
    let index = Math.floor(Math.random() * (ALL_WORDS + 1));

    $.get('./data/wordle-answers-alphabetical.txt', function (data) {
        everyWord = data.split("\n");
        wordToFind = everyWord[index]
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
    const KEY_CODES = [
        65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
        97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122
    ];

    if ($.inArray(e.which, KEY_CODES) !== -1) {
        handleAddLetter(e.key)
    } else {
        console.log('Invalid key entered')
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
            if (attemptNo < 5) {
                handleColorCoding(wordAttempt);
                workingDivs = [];
            } else {
                handleColorCoding(wordAttempt);
                celebration(false)
            }
            break;

        case true:
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
                $('#modalContent').html('<h2>Congrats!</h2><br/>You correctly guessed the word.<br/>Click Close to review your game, or Play Again for another game.')
                $('#winModal').addClass('modalSeen')
            }, 1000)
            break;
        case false:
            setTimeout(() => {
                $('#modalContent').html(`<h2>Better luck next time.</h2><br/>The correct word was ${wordToFind}. <br/>Click Close to review your game, or Play Again for another game.`)
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