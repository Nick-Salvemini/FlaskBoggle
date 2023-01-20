let $guess = $('#guess').value()
let $button = $('#submit')

async function checkWord() {
    let word = $guess;
    const res = await axios.post('http://127.0.0.1:5000', word);

    console.log(res)
}

$button.on('click', function (evt) {
    evt.preventDefault();
    checkWord()
})