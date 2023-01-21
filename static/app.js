const $button = $('#submit')
const $result = $('#result')
const $scoreboard = $('#score')
const $guess = $('#score')

let totalScore = 0
$scoreboard.text(totalScore)

correctAnswer = []

async function checkWord(word) {
    const res = await axios.get('http://127.0.0.1:5000/check_word', { params: { 'response': word } });
}

async function getJsonResponse() {
    let word = $('#guess').val();
    const res = await axios.get('http://127.0.0.1:5000/check_word', { params: { 'response': word } })
    answerObj = res.data

    return answerObj
}

function checkWordScore(word) {
    let score = word.length;
    return score
}

$button.on('click', async function (evt) {
    evt.preventDefault();
    word = $('#guess').val()

    if (correctAnswer.indexOf(word) !== -1) {
        $result.text(`You already guessed ${word}`);
    }

    await checkWord(word);

    answerObj = await getJsonResponse();

    result = answerObj['result']

    let wordScore

    if (result === 'not-word') {
        $result.text(`${word} is not a word`);
        console.log('tt', $('#score').text())
    }
    else if (result === 'not-on-board') {
        $result.text(`${word} is not on the current board`);
        console.log('tt', $('#score').text())
    }
    else {
        console.log('uu', $('#score').text())
        wordScore = checkWordScore(word)
        correctAnswer.push(word)

        totalScore += wordScore
        $scoreboard.text(totalScore)
        console.log(totalScore)
        $result.text(`${word} was worth ${wordScore} points!`)
        console.log('*ii', $('#score').text())
    }

    $('#guess').val('')
})



