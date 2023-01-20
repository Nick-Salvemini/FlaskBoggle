let $guess = $('#guess').value()
const $button = $('#submit')
const $result = $('#result')

let totalScore = 0
const $score = totalScore

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
        $result.val(`${word} is not a word`)
    else if (word === 'not-on-board')
        $result.val(`${word} is not on the current board`)
    else
        wordScore = checkWordScore(word)
    $result.val(`${word} was worth ${wordScore} points!`)
    totalScore += wordScore
})



