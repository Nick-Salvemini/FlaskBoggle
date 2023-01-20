from boggle import Boggle
from flask import Flask, render_template, redirect, flash, jsonify, request
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'itsasecret'
debug = DebugToolbarExtension
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

boggle_game = Boggle()

@app.route('/')
def make_game():
    game_board = boggle_game.make_board()
    return render_template('home.html')

