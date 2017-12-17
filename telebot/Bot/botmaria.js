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


/*bot.on('/list', msg => {

con.query("SELECT * FROM poll", function (err, result, fields) {
    if (err) throw err;
  
    for(var i = 0; i <= result.length -1; i++){
		
		bot.sendMessage(msg.from.id, result[i].id +' .  '+ result[i].title);
    }	
	});
    return bot;
});*/

bot.on('text', function (message) {

if(message.text == "List" || message.text == "list" || message.text == "/list" ) {

con.query("SELECT * FROM poll", function (err, result, fields) {
    if (err) throw err;
  
    for(var i = 0; i <= result.length -1; i++){
		
		bot.sendMessage(message.from.id, result[i].id +' .  '+ result[i].title);
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
	        var aux = [bot.inlineButton(result2[i].description, {callback: 'this_is_data'})];
	        botones.push(aux);
	    	}
		var replyMarkup = bot.inlineKeyboard(botones);
		bot.sendMessage(message.from.id, titulo, {replyMarkup});
		});
	
	    
    }
});

}
    return bot;
});


bot.start();
