const TeleBot = require('../');
const bot = new TeleBot('468529599:AAGcOzFesrDRJ9SJzvvs___qjJJxppbMcbc');

const mysql = require('mysql');
var ids = [];

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
		   'Grado de Ingeniería del Software en la US.\n' +
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
	
		bot.sendMessage(message.from.id, 'Si quiere participar en la encuesta "'+result[i].title+'" Pulsar: /'+result[i].id, {replyMarkup});
	
	    }	
		});
	}else if(Number.isInteger(parseInt(message.text[1]))){
	var siguiente = "Next " + message.text[1] + " 0";
	let replyMarkup = bot.keyboard([[siguiente , "/Volver" ]], {resize: true});
	bot.sendMessage(message.from.id,"Has elegido la encuesta "+message.text[1]+ ". Si desea continuar pulse el boton Next, si quiere volver atrás pulse /Volver.", {replyMarkup});
	
	}
	else if(n[0] == "Next"){
	var u = parseInt(n[2]);
	var poll = n[1];
	var query2 = "SELECT * FROM question where poll_id = " + poll;
	con.query(query2, function (err, result1, fields) {
	var botones = [];
	var titulo = result1[u].title;
	if(u <result1.length - 1){
	var query3 = "SELECT * FROM question_option where question_id = "+result1[u].id;
	con.query(query3, function (err, result2, fields) {
	 	for (let i = 0; i <= result2.length - 1; i++) {

			var aux = [bot.inlineButton(result2[i].description, {callback: result2[i].id+ " Next "+poll+" "+u})];
			botones.push(aux);

	    	}
		
		
		var replyMarkup = bot.inlineKeyboard(botones);
		bot.sendMessage(message.from.id, titulo, {replyMarkup});
		
		});
		}else{
		let replyMarkup = bot.keyboard([["/Volver" ]], {resize: true});
		bot.sendMessage(message.from.id, "Ya finalizó la encuesta gracias.Pulse volver", {replyMarkup});
		}		

	});
	}
	   
	    return bot;
	});

// Inline button callback
bot.on('callbackQuery', msg => {
    // User message alert
	var pregunta1 = msg.data;
	var n = pregunta1.split(" ");
	var u = parseInt(n[3]) + 1;
	var poll = n[2];
	var id = parseInt(n[0]);
	var next = n[1];
	ids.push(id);
	console.log(ids);
	var siguiente = next + " " +poll +" "+ u;
	let replyMarkup = bot.keyboard([[siguiente , "/Volver" ]], {resize: true});
	bot.sendMessage(msg.from.id, "Has respondido a la pregunta "+ u +" pulse next para continuar.", {replyMarkup});
    return bot.answerCallbackQuery(msg.id, `msg.data`, true);
});


bot.start();
