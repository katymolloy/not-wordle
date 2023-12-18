
const ALL_WORDS = 14855;
var wordToFind = '';
var wordAttempt = '';
var workingDivs = [];
var divIdIndex = 0
const divFocus = $('.letterInput')
console.log(divFocus)


function randomNum() {
    let index = Math.floor(Math.random() * (ALL_WORDS + 1));

    $.get('./data/valid-wordle-words.txt', function (data) {
        let allWords = data.split("\n")
        wordToFind = allWords[index]
        // take out before adding to vercel - no cheating on my watch
        console.log(wordToFind)
    }, 'text');
}

randomNum();



$(document).keypress(function (e) {
    if (e.which !== 13 && e.which !== 8) {
        if (wordAttempt.length < 5) {
            $(divFocus[divIdIndex]).text(e.key.toUpperCase());
            workingDivs.push(divFocus[divIdIndex].id)
            // console.log(workingDivs)
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
            console.log(workingDivs)
            checkAnswer(wordAttempt);
            wordAttempt = '';
            break;
        case 8:
            if (wordAttempt.length > 0) {
                wordAttempt = wordAttempt.slice(0, -1)
                divIdIndex--

                $(divFocus[divIdIndex]).empty();
                break;
            }

    }
})



const checkAnswer = (word) => {
    console.log(word, wordToFind)
    workingDivs = [];
    for (let i = 0; i < word.length; i++) {
        if (word[i] === wordToFind[i]) {
            console.log('here')
        } else if (wordToFind.includes(word[i])) {
            console.log('close match')
        }
    }

    // for (let i = 0; i < word.length; i++) {
    //     // console.log(word[i] + ' ' + wordToFind[i])
    //     if (word[i] === wordToFind[i]) {
    //         $(divFocus.id).filter(function() {
    //             return $(this).text().includes(word[i]);
    //           }).addClass('correctGuess');
    //     }
    // }

}
