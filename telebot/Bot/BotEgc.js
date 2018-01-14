const TeleBot = require('../');
const bot = new TeleBot('489385493:AAHABtpV9COcsOfgvhJM7WLy32TMps_PDiI');
const fs = require('fs');

//bot.on('/pregunta', msg =>{
//  var chatId = msg.chat.id;
//  bot.sendMessage(chatId,"¿En que año fue uno mas uno?");
//});
//
//bot.on('/pregunta', msg => {
//    let replyMarkup = bot.inlineKeyboard([
//        [
//            bot.inlineButton('respuesta 1', {callback: 'this_is_data'})],
//        [
//            bot.inlineButton('respuesta 2', {inline: 'some query'})],
//        [
//            bot.inlineButton('respuesta 3', {url: 'https://telegram.org'})
//       ]
//    ]);
//   var pregunta1 = '¿En que año fue uno mas uno?';
//   fs.writeFile('falsaBD.txt', pregunta1);
//    return bot.sendMessage(msg.from.id, pregunta1, {replyMarkup});
//});
bot.on('/start', msg => {
    var chatId = msg.from.id;
    var name = msg.from.first_name;
    var text = '¡Bienvenido '+name+'!\n' +
                   'Agora US es un sistema de votación electronico que permite llevar el tradiccional' +
                   ' método de votación actual a un sistema online de forma segura.\n\n' +
                   'Este bot es una integración de dicho sistema y actualmente permite:\n' +
                   '/votaciones - ✉️ Muestra las votaciones existentes\n';
    return bot.sendMessage(chatId, text);
});

bot.start();
