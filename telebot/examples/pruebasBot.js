const TeleBot = require('../');
const bot = new TeleBot('468529599:AAGcOzFesrDRJ9SJzvvs___qjJJxppbMcbc');


class Encuesta {
  constructor(nombre, preguntas ) {
    this.nombre = nombre;
    this.preguntas = preguntas;
  }
}

class Pregunta{
	constructor(nombre, respuestas) {
    this.nombre = nombre;
    this.respuestas = respuestas;
  }

}
class Respuesta{
	constructor(nombre) {
    this.nombre = nombre;
  }

}

const  respuesta1 = new Respuesta('respuesta1');
const  respuesta2 = new Respuesta('respuesta2');
var  listR = [respuesta1,respuesta2];
const  pregunta1 = new Pregunta('Pregunta1',listR);
const  pregunta2 = new Pregunta('Pregunta2', listR);
var  listP = [pregunta1,pregunta2];
const  encuesta1 = new Encuesta('Encuesta1',listP);
const  encuesta2 = new Encuesta('Encuesta2',listP);
var  encuestas = [encuesta1,encuesta2];
//console.log(encuestas[0].preguntas[0].respuestas);
// Inline buttons
bot.on('/preguntas', msg => {

	var poll = encuestas[0];
	var pregun = poll.preguntas;


    for(var i = 0; i <= pregun.length -1; i++){
	    var nombre=	pregun[i].nombre;
	    var respuestas = pregun[i].respuestas;
	   	var botones = [];
	 	for (let i = 0; i <= respuestas.length - 1; i++) {
	        var aux = [bot.inlineButton(respuestas[i].nombre, {callback: 'this_is_data'})];
	        botones.push(aux);
	    }
	    var replyMarkup = bot.inlineKeyboard(botones);
		bot.sendMessage(msg.from.id, nombre, {replyMarkup});
    }
    return bot;
});

bot.on('/list', msg => {

	var polls = encuestas;

    for(var i = 0; i <= polls.length -1; i++){
		
		bot.sendMessage(msg.from.id, '/'+ [i+1] +' .  '+ polls[i].nombre);
    }
    return bot;
});



bot.start();