let $guess = $('#guess').val()
const $button = $('#submit')
const $result = $('#result')

const $scoreboard = $('#score')
let totalScore = 0
let $score = totalScore
$scoreboard.text = $score

async function checkWord() {
    let word = $guess;
    const res = await axios.get('http://127.0.0.1:5000/check_word', word);

    console.log(res)
}

async function getJsonResponse() {
    const res = await axios.get('http://127.0.0.1:5000/check_word')
    console.log(res)
    answerObj = JSON.parse(res)

    return answerObj
}

function checkWordScore(word) {
    score = word.length
    return score
}

$button.on('click', async function (evt) {
    evt.preventDefault();
    await checkWord();

    answerObj = await getJsonResponse();

    word = answerObj['result']

    if (word === 'not-word')
        $result.text(`${word} is not a word`)
    else if (word === 'not-on-board')
        $result.text(`${word} is not on the current board`)
    else
        wordScore = checkWordScore(word)
    $result.text(`${word} was worth ${wordScore} points!`)
    totalScore += wordScore
})



