const $button = $('#submit')
const $resetButton = $('#resetButton')
const $result = $('#result')
const $scoreboard = $('#score')
const $guess = $('#score')
const $timer = $('#timer')
const $highScore = $('#highScore')

let highScore = 0

console.log(sessionStorage.getItem('board'))

if (sessionStorage.getItem('high_score') > 0) {
    highScore = sessionStorage.getItem('high_score')
}
$highScore.text(`High Score: ${highScore}`)

let totalScore = 0
$scoreboard.text(`Score: ${totalScore}`)

let time = 5
$timer.text(`Time: ${time}`)

let correctAnswer = []

async function checkWord(word) {
    const res = await axios.get('http://127.0.0.1:5000/check_word', { params: { 'response': word } });
}

async function getJsonResponse() {
    let word = $('#guess').val();
    const res = await axios.get('http://127.0.0.1:5000/check_word', { params: { 'response': word } })
    answerObj = res.data
    return answerObj
}

function endGame() {
    $resetButton.removeClass('resetButton');
    $button.addClass('gameOver');

    alert('Time"s up!');
    if (totalScore > sessionStorage.getItem('high_score')) {
        sessionStorage.setItem('high_score', totalScore);
    }

}

function checkWordScore(word) {
    let score = word.length;
    return score
}

function startTimer() {
    startTimer = setInterval(tickTimer, 1000)
}

function tickTimer() {
    time -= 1;
    $timer.text(`Time: ${time}`)
    if (time === 0) {
        clearInterval(startTimer)
    }
    if (time === 0) {
        $timer.text(`Time: 0`)
        $result.text(`Game Over!`)

        endGame()
    }
}

$button.on('click', async function (evt) {
    evt.preventDefault();
    word = $('#guess').val()

    if (time === 5) {
        startTimer()
    }

    if (correctAnswer.indexOf(word) !== -1) {
        $result.text(`You already guessed ${word}`);
    }
    else {
        await checkWord(word);

        answerObj = await getJsonResponse();

        result = answerObj['result']

        let wordScore

        if (result === 'not-word') {
            $result.text(`"${word}" is not a word`);
            console.log('tt', $('#score').text())
        }
        else if (result === 'not-on-board') {
            $result.text(`"${word}" is not on the current board`);
            console.log('tt', $('#score').text())
        }
        else {
            console.log('uu', $('#score').text())
            wordScore = checkWordScore(word)
            correctAnswer.push(word)

            totalScore += wordScore
            $scoreboard.text(`Score: ${totalScore}`)
            console.log(totalScore)
            $result.text(`"${word}" was worth ${wordScore} points!`)
            console.log('*ii', $('#score').text())
        }

    }

    $('#guess').val('')
})

$resetButton.on('click', function (evt) {
    evt.preventDefault();
    console.log(sessionStorage.getItem('board'));
    sessionStorage.removeItem('board');
    console.log(sessionStorage.getItem('board'));
    // location.reload()
})