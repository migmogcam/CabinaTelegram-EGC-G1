const TeleBot = require('../');
const bot = new TeleBot('468529599:AAGcOzFesrDRJ9SJzvvs___qjJJxppbMcbc');

// On commands
bot.on(['/start', '/back'], msg => {

    let replyMarkup = bot.keyboard([
        ['/buttons', '/inlineKeyboard'],
        ['/start', '/hide']
    ], {resize: true});

    return bot.sendMessage(msg.from.id, 'Keyboard example.', {replyMarkup});

});

// Buttons
bot.on('/buttons', msg => {

    let replyMarkup = bot.keyboard([
        [bot.button('contact', 'Your numero'), bot.button('location', 'Your sitio')],
        ['/back', '/hide']
    ], {resize: true});

    return bot.sendMessage(msg.from.id, 'Button example.', {replyMarkup});

});

// Hide keyboard
bot.on('/hide', msg => {
    return bot.sendMessage(
        msg.from.id, 'Hide keyboard example. Type /back to show.', {replyMarkup: 'hide'}
    );
});

// On location on contact message
bot.on(['location', 'contact'], (msg, self) => {
    return bot.sendMessage(msg.from.id, `Thank you for ${ self.type }.`);
});

// Inline buttons
bot.on('/inlineKeyboard', msg => {
    var pregunta = "¿Que te parece la situación de cataluña?";
    var respuestas = ["Me da igual","les cagaba en el pecho","todas putas","viva franco", "no soy 100tifico"];
    var botones = [];
    for (var i = 0; i <= respuestas.length - 1; i++) {
        var aux = [bot.inlineButton(respuestas[i], {callback: 'this_is_data'})];
        botones.push(aux);
    }

    let replyMarkup = bot.inlineKeyboard(botones);


    return bot.sendMessage(msg.from.id, pregunta, {replyMarkup});

});

// Inline button callback
bot.on('callbackQuery', msg => {
    // User message alert
    return bot.answerCallbackQuery(msg.id, `Inline button callback: ${ msg.data }`, true);
});

// Inline query
bot.on('inlineQuery', msg => {

    const query = msg.query;
    const answers = bot.answerList(msg.id);

    answers.addArticle({
        id: 'query',
        title: 'Inline Query',
        description: `Your query: ${ query }`,
        message_text: 'Click!'
    });

    return bot.answerQuery(answers);

});

bot.start();
