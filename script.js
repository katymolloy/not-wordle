
const ALL_WORDS = 14855;
var everyWord = []
var wordToFind = '';
var wordAttempt = '';
var workingDivs = [];
var divIdIndex = 0
const divFocus = $('.letterInput')

function randomNum() {
    let index = Math.floor(Math.random() * (ALL_WORDS + 1));

    $.get('./data/valid-wordle-words.txt', function (data) {
        everyWord = data.split("\n");

        wordToFind = everyWord[index]
        // take out before adding to vercel - no cheating on my watch
        console.log(wordToFind)
    }, 'text');
}

randomNum();



$(document).keypress(function (e) {
    if (e.which !== 13 && e.which !== 8) {
        if (wordAttempt.length < 5) {
            $(divFocus[divIdIndex]).text(e.key.toUpperCase());
            workingDivs.push('#' + divFocus[divIdIndex].id)

            wordAttempt += e.key;
            divIdIndex++;
        } else {
            console.log('At yer limit, pardner');
        }

    }


});

// keydown function handles enter and backspace
$(document).keydown(function (e) {
    switch (e.which) {
        case 13:
            // ensure word input is valid
            if ($.inArray(wordAttempt, everyWord) !== -1) {
                checkAnswer(wordAttempt);
                wordAttempt = '';

            } else {
                $(workingDivs[0]).parent().addClass('wrongAnswer')
                workingDivs = [];
            }
            $(workingDivs[0]).parent().removeClass('wrongAnswer')
            break;
        case 8:
            if (wordAttempt.length > 0) {
                wordAttempt = wordAttempt.slice(0, -1)
                divIdIndex--
                workingDivs.splice(-1, 1)
                $(divFocus[divIdIndex]).empty();
                break;
            }

    }
})



const checkAnswer = (word) => {
    console.log(word, wordToFind, workingDivs)

    switch (word === wordToFind) {
        case false:
            for (let i = 0; i < word.length; i++) {
                if (word[i] === wordToFind[i]) {
                    $(workingDivs[i]).addClass('correctGuess')
                }else if(wordToFind.includes(word[i])){
                    $(workingDivs[i]).addClass('closeGuess')
                }else{
                    $(workingDivs[i]).addClass('wrongGuess')
                }
            }
            workingDivs = [];
            break
            ;
        case true:

            celebration();
            break;
    }
}

const celebration = () => {
    for (let i = 0; i < wordAttempt.length; i++) {
        $(workingDivs[i]).addClass('correctGuess')
    }
   $('body').addClass('hellYeah')
    workingDivs = [];
}
