
const ALL_WORDS = 14855;
var wordToFind = '';
var wordAttempt = '';
var attemptNumber = 1
var divIdIndex = 0
const divFocus = document.querySelectorAll('.letterInput')


function randomNum() {
    let index = Math.floor(Math.random() * (ALL_WORDS + 1));
    console.log(index)
    $.get('./data/valid-wordle-words.txt', function (data) {
        let allWords = data.split("\n")
        wordToFind = allWords[index]
        // take out before adding to vercel - no cheating on my watch
        console.log(wordToFind)
    }, 'text');
}

randomNum();



$(document).keypress(function (e) {
    // no keyword to ensure variable is global; less redundancy 
    currentDiv = '#' + divFocus[divIdIndex].id;


    if (e.which !== 13 && e.which !== 8) {
        if (wordAttempt.length < 5) {
            $(currentDiv).text(e.key.toUpperCase());

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
            console.log('I pressed enter')
            checkAnswer(wordAttempt);
            wordAttempt = '';
            break;
        case 8:
            console.log('pressed back, first index and word: ' + divIdIndex + ', ' + wordAttempt)
            // last character is removed and reassigned
            wordAttempt = wordAttempt.slice(0, -1)
            divIdIndex--
            console.log(currentDiv)
            // empty function is used to remove text child node from div being backspacedF
            $(currentDiv).empty();
            console.log('updated index and word: ' + divIdIndex + ', ' + wordAttempt)
            break;
    }
})



const checkAnswer = (word) => {
    console.log(word, wordToFind)
    for (let i = 0; i < word.length; i++) {
        console.log(word[i] + ' ' + wordToFind[i])
    }
}
