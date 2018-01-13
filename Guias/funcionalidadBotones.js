//este es el metodo que he encontrado para darle funcionalidad a los botones y ademas guardar respuestas en un fichero:


const TeleBot = require('../');
const bot = new TeleBot('<TOKEN DEL BOT>');
const fs = require('fs');


//aqui tienemos un ejemplo de boton tipo Inline con funcion callback
//----------------------------------------------------------------------------
bot.on('/inlineKeyboard', msg => {

    let replyMarkup = bot.inlineKeyboard([
        [
            bot.inlineButton('callback', {callback: 'resp1'})
        ]
    ]);
    return bot.sendMessage(msg.from.id, 'Inline keyboard example.', {replyMarkup});

});


//y aqui tenemos la funcionalidad del callBack dentro del metodo podemos añadir lo que queremos que haga el boton al pulsar:
//--------------------------------------------------------------------------------
// Inline button callback
bot.on('callbackQuery', msg => {
    // User message alert
	var pregunta1 = msg.data;
	fs.writeFile('falsaBd', pregunta1);
bot.sendMessage(msg.from.id, pregunta1);
    return bot.answerCallbackQuery(msg.id, `msg.data`, true);
});


bot.start();
