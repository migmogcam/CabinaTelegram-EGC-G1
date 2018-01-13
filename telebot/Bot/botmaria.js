const TeleBot = require('../');
const bot = new TeleBot('468529599:AAGcOzFesrDRJ9SJzvvs___qjJJxppbMcbc');


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
	var n = message.text.split(" ");

	if(message.text == "List" || message.text == "list" || message.text == "/list" || message.text == 			"Listar encuestas" ) {

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
	else if(n[0] == "Next"){
	var u = n[2];
	var poll = n[1];
	var query2 = "SELECT * FROM question where poll_id = " + poll;
	con.query(query2, function (err, result1, fields) {
	var botones = [];
	var titulo = result1[u].title;
	var query3 = "SELECT * FROM question_option where question_id = "+result1[u].id;
	con.query(query3, function (err, result2, fields) {
	 	for (let i = 0; i <= result2.length - 1; i++) {
			var aux = [bot.inlineButton(result2[i].description, {callback: 'this_is_data'}	)];
			botones.push(aux);
	    	}
		var replyMarkup = bot.inlineKeyboard(botones);
		bot.sendMessage(message.from.id, titulo, {replyMarkup});
		});

	});
	}
	    return bot;
	});


bot.start();
