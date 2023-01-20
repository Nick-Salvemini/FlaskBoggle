from boggle import Boggle
from flask import Flask, render_template, redirect, flash, jsonify, request, session
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'itsasecret'
debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

boggle_game = Boggle()

# if session.get('board'):
#     game_board = session['board']
# else:
#     game_board = boggle_game.make_board()
#     session['board'] = game_board

game_board = boggle_game.make_board()   

@app.route('/')
def make_game():

    if session.get('board'):
        game_board = session['board']
    else:
        game_board = boggle_game.make_board()
        session['board'] = game_board
    
    # guess = request.form['guess']
    # check_word = boggle_game.check_valid_word(game_board, guess)
    # response = {'result': check_word}
    # json_response = jsonify(response)
    # flash(json_response)
    # flash(guess)
    
    return render_template('home.html', game_board=game_board)

@app.route('/check_word')
def request_check_word():
    guess = request.args.get('word')
    check_word = boggle_game.check_valid_word(game_board, guess)
    response = {'result': check_word}
    json_response = jsonify(response)
    return json_response

    # guess = request.args.get('word')
    # response = {'result': check_word}
    # json_response = jsonify(response)
    # flash(guess)
    # return json_response
    # flash(guess)
    # return guess

