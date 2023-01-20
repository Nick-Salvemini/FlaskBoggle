from boggle import Boggle
from flask import Flask, render_template, redirect, flash, jsonify, request
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'itsasecret'
debug = DebugToolbarExtension
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

boggle_game = Boggle()

game_board = boggle_game.make_board()

@app.route('/', methods=['GET'])
def make_game():
    
    
    
    # guess = request.form['guess']
    # check_word = boggle_game.check_valid_word(game_board, guess)
    # response = {'result': check_word}
    # json_response = jsonify(response)
    # flash(json_response)
    # flash(guess)
    

    return render_template('home.html', game_board=game_board)

@app.route('/check_word', methods=['POST'])
def request_check_word():
    guess = request.form['guess']
    # check_word = boggle_game.check_valid_word(game_board, guess)
    # response = {'result': check_word}
    # json_response = jsonify(response)
    # flash(json_response)
    # return json_response
    # flash(guess)
    # return guess

