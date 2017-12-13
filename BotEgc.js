var TelegramBot = require('node-telegram-bot-api');

var token = '489385493:AAHABtpV9COcsOfgvhJM7WLy32TMps_PDiI';

var bot = new TelegramBot(token, {polling: true});
bot.on('text', function (msg) {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId,msg.from.first_name + " ha enviado " + msg.text);
});
