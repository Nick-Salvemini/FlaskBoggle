from unittest import TestCase
from app import app
from flask import session, jsonify
from boggle import Boggle

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']


class FlaskTests(TestCase):

    def test_(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)
            client.set_cookie( 'board', '[[A,B,C],[D,E,F],[G,H,I]]' )

            self.assertEqual(res.status_code, 200)
            self.assertIn(
                '<td class="letter">E</td>', html
                )

    def test_(self):
        with app.test_client() as client:
            res = client.get('/check_word', data={'response': 'hello'})

            self.assertEqual(res, jsonify({'response': 'hello'}))

            

    

