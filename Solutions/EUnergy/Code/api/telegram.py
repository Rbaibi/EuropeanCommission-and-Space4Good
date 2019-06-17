# import sys
# import subprocess
# subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'telebot7'])

import telebot
from flask import Flask
from flask import request
from flask_cors import cross_origin
import requests
import json

app = Flask(__name__)

# Create new bot here: https://web.telegram.org/#/im?p=@BotFather
TOKEN = '898051088:AAGvfkawDAtl4TnRgkmxpGLel1kIkhD41LY'
TOKEN = '802598551:AAEXpo1jDUoVmOfbjlILP455redbPVHZo8I'  # Eunergy_bot
bot = telebot.TeleBot(TOKEN)


@bot.message_handler(func=lambda message: True)
def echo_all(message):
    #     print (dir(message))
    #     print('chat:', message.chat.id)
    #     bot.send_message(758479067, "Best!", )
    bot.reply_to(message, "The chat support is not implemented yet!")


import time


@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    bot.reply_to(message, "Howdy, how are you doing?")


@bot.message_handler(commands=['die'])
def send_welcome(message):
    time.sleep(3)
    bot.reply_to(message, "Dieing...")
    exit()


@app.route("/weather")
@cross_origin(headers=['Content-Type', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'])
def weather():
    lng = request.args.get('lng')
    lat = request.args.get('lat')
    print('https://api.darksky.net/forecast/373c65ac8e97334a1f96d87c50227d27/{},{}'.format(lat, lng))
    r = requests.get('https://api.darksky.net/forecast/373c65ac8e97334a1f96d87c50227d27/{},{}'.format(lat, lng))
    print(r.json())
    return flask.jsonify(r.json())


@app.route("/")
@cross_origin(headers=['Content-Type', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'])
def hello():
    msg = request.args.get('msg')
    bot.send_message(758479067, msg)
    return "Hello World!"


# if __name__ == '__main__':
#     app.run()
# bot.polling()
if __name__ == '__main__':
    app.run('localhost', 4000)
