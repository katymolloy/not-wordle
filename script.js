
const ALL_WORDS = 14855;
var wordToFind = '';

(function randomNum() {
    let index = Math.floor(Math.random() * (ALL_WORDS + 1));
    console.log(index)
    $.get('./data/valid-wordle-words.txt', function (data) {
        let allWords = data.split("\n")
        wordToFind = allWords[index]
        console.log(wordToFind)
    }, 'text');
})();




$('.letterInput').keyup(function () {
    if ($(this).val().length == $(this).attr("maxlength")) {
        $(this).next('.letterInput').focus();
    }
});


$('#clearFields').click(function () {
    $('.letterInput').val('')
});


