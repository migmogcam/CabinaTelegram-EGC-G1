const TeleBot = require('../');
const bot = new TeleBot('489385493:AAHABtpV9COcsOfgvhJM7WLy32TMps_PDiI');


const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "egc1718",
  database:"votaciones_splc"
});

con.connect(function(err) {
  if (err) throw err;
});

bot.on(['/start', '/Volver'], msg => {
    var chatId = msg.from.id;
    var name = msg.from.first_name;
    var text = '¡Bienvenido '+name+'!\n' +
                   'Este bot es una integración de un sistema de votacion electronica desarrollada por' +
		   ' los alumnos de la asignatura de Evaluación y Gestión de la Configuración (EGC) '+
		   'Grado de Ingeniería del Software.\n' +
                   '\n';
    let replyMarkup = bot.keyboard([
        ['Listar encuestas']
], {resize: true});

    return bot.sendMessage(chatId, text, {replyMarkup});
});


bot.on('text', function (message) {

if(message.text == "List" || message.text == "list" || message.text == "/list" || message.text == "Listar encuestas" ) {

con.query("SELECT * FROM poll", function (err, result, fields) {
    if (err) throw err;

    let replyMarkup = bot.keyboard([
        ['/Volver']
], {resize: true});
    
    for(var i = 0; i <= result.length -1; i++){
		
	bot.sendMessage(message.from.id, 'Si quiere participar en la encuesta "'+result[i].title+'" Escriba: '+result[i].id, {replyMarkup});
		
    }	
	});
}
else if(Number.isInteger(parseInt(message.text))){
  var chatId = message.chat.id;

var query2 = "SELECT * FROM question where poll_id = "+message.text;
con.query(query2, function (err, result1, fields) {
for(var i = 0; i <= result1.length -1; i++){
	    var botones = [];
	var titulo = result1[i].title;
	    var query3 = "SELECT * FROM question_option where question_id = "+result1[i].id;
		con.query(query3, function (err, result2, fields) {
	 	for (let i = 0; i <= result2.length - 1; i++) {
	        var aux = [bot.inlineButton(result2[i].description, {callback: 'some_data_callback'})];
	        botones.push(aux);
	    	}
		var replyMarkup = bot.inlineKeyboard(botones);
		bot.sendMessage(message.from.id, titulo, {replyMarkup});
		});
	
	    
    }
});

}

// Inline button callback
bot.on('callbackQuery', msg => {
    // aqui se puede añadir las funcionalidades de los botones
    return bot.answerCallbackQuery(msg.id, `Inline button callback: ${ msg.data }`, true);
});

    return bot;
});


bot.start();
