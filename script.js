
const ALL_WORDS = 2315;
const divFocus = $('.letterInput');
const keys = $('.keyboardKey').toArray();
console.log(keys)
var validGuesses = [];
var everyWord = []
var wordToFind = '';
var wordAttempt = '';
var attemptNo = 0;
var workingDivs = [];
var workingLetters = [];
var divIdIndex = 0;
var winner = false;


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
// calling the function to get a word
randomNum();



$(keys).on('click', function () {
    switch ($(this).val()) {
        case 'enter':
            if ($.inArray(wordAttempt.toLowerCase(), validGuesses) !== -1) {
                checkAnswer(wordAttempt.toLowerCase());
                wordAttempt = '';
            } else {
                $(workingDivs[0]).parent().addClass('wrongAnswer')
                workingDivs = [];
                setTimeout(() => {
                    $(workingDivs[0]).parent().removeClass('wrongAnswer')
                }, 1000)

            }
            break;
        case 'back':
            if (wordAttempt.length > 0) {
                wordAttempt = wordAttempt.slice(0, -1)
                divIdIndex--
                workingDivs.splice(-1, 1)
                $(divFocus[divIdIndex]).empty();

            }
            break;
        default:
            if (wordAttempt.length < 5) {
                $(divFocus[divIdIndex]).text($(this).val());
                $(divFocus[divIdIndex]).addClass('addLetter');
                workingDivs.push('#' + divFocus[divIdIndex].id)
                // workingLetters.push(e.key.toUpperCase())

                wordAttempt += $(this).val();

                $(divFocus[divIdIndex]).removeClass('addLetter')


                divIdIndex++;
            } else {
                console.log('At yer limit, pardner');
            }

            break;
    }
})






$(document).keypress(function (e) {
    if (e.which !== 13 && e.which !== 8) {
        if (wordAttempt.length < 5) {
            $(divFocus[divIdIndex]).text(e.key.toUpperCase());
            $(divFocus[divIdIndex]).addClass('addLetter');
            workingDivs.push('#' + divFocus[divIdIndex].id)
            workingLetters.push(e.key.toUpperCase())

            wordAttempt += e.key;
            // setTimeout(() => {
            //     $(divFocus[divIdIndex]).removeClass('addLetter')
            // }, 1000)

            divIdIndex++;
        } else {
            console.log('At yer limit, pardner');
        }
    }
});








// keydown function handles enter and backspace
$(document).keydown(function (e) {
    switch (e.which) {
        // enter
        case 13:
            // ensure word input is valid
            if ($.inArray(wordAttempt, validGuesses) !== -1) {
                checkAnswer(wordAttempt);
                wordAttempt = '';

            } else {
                $(workingDivs[0]).parent().addClass('wrongAnswer')
                workingDivs = [];
                setTimeout(() => {
                    $(workingDivs[0]).parent().removeClass('wrongAnswer')
                }, 1000)
            }
            break;
        // backspace
        case 8:
            if (wordAttempt.length > 0) {
                wordAttempt = wordAttempt.slice(0, -1)
                $(divFocus[divIdIndex]).removeClass('addLetter')
                divIdIndex--
                workingDivs.splice(-1, 1)
                $(divFocus[divIdIndex]).empty();
                break;
            }
    }
})



const checkAnswer = (word) => {
    attemptNo++;




    if (attemptNo < 6) {

        switch (word === wordToFind) {
            case false:
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === wordToFind[i]) {
                        $(workingDivs[i]).addClass('correctGuess')

                        for (let j = 0; j < keys.length; j++) {
                            if (keys[j].value === word[i]) {
                                $(keys[j]).addClass('correctGuess')
                            }
                        }

                    } else if (wordToFind.includes(word[i])) {
                        $(workingDivs[i]).addClass('closeGuess');

                        for (let j = 0; j < keys.length; j++) {
                            if (keys[j].value === word[i]) {
                                $(keys[j]).addClass('closeGuess')
                            }
                        }

                    } else {
                        $(workingDivs[i]).addClass('wrongGuess');

                        for (let j = 0; j < keys.length; j++) {
                            if (keys[j].value === word[i]) {
                                $(keys[j]).addClass('wrongGuess')
                            }
                        }
                    }
                }
                workingDivs = [];
                break
                ;
            case true:
                for (let i = 0; i < workingDivs.length; i++) {
                    $(workingDivs[i]).addClass('correctGuess hellYeah')
                }
                winner = true;
                celebration(winner);
                break;
        }

    }
}

const celebration = (w) => {
    // 
    switch (w) {
        case true:
            setTimeout(() => {
                $('#modalContent').text('Congrats! You correctly guessed the word.')
                $('#winModal').addClass('modalSeen')
            }, 1000)

            break;
        case false:
            setTimeout(() => {
                $('#modalContent').text("Sorry, you lost this game. Try again?")
                $('#winModal').addClass('modalSeen')
            }, 1000)
            break;
    }

}


$('#playAgain').on('click', function () {
    // if user chooses to play again, variables are all reset
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

    // all classes are removed, divs are emptied

})