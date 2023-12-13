
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
        console.log(wordToFind)
    }, 'text');
}

randomNum();



$(document).keypress(function (e) {
    let currentDiv = '#' + divFocus[divIdIndex].id;

    if (e.which === 13) {
        checkAnswer(wordAttempt)
        wordAttempt = ''
    } else {
        if (wordAttempt.length === 5) {
            console.log('At yer limit pardner')
           
        } else {
            $(currentDiv).text(e.key.toUpperCase());
            wordAttempt += e.key
            divIdIndex++;
        }


    }



});




$('#clearFields').click(function () {
    $('.letterInput').text('')
    randomNum();
});


const checkAnswer = (word) => {
console.log(word)

}
