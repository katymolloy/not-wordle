
const ALL_WORDS = 14855;
var wordToFind = '';
var attemptNumber = 1
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




// function to jump to next input
$(document).keydown(function (e) {
    let currentDiv = divFocus[0].id
    console.log(e.key)
});


$('#clearFields').click(function () {
    $('.letterInput').val('')
    randomNum();
});


$('#checkAnswer').click(function () {
    var wordAttempt = ''

    $(`${'#row' + attemptNumber} input`).each(function () {
        wordAttempt += $(this).val();
    });
    console.log(wordAttempt)

    ++attemptNumber
})
