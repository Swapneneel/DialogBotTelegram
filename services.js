//This is for tesing purpose of Telegram Bot DialogBot.
//It can answer only for weather details unil now.
//This code will echo the message sent.

//****************Testing for the server is working or not***********************

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//These are only for heroku yet. Not for the local nodejs service
const pgAccess = process.env.FB_PG_ACCESS_TOKEN;
const vfToken = process.env.VF_ACCESS_TOKEN;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

/* For Facebook Validation */
app.get('/', function (req, res) {
  res.send("Hello there! I'm working my best.")
});

app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === vfToken) {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
});

/* Handling all messenges */
app.post('/webhook', (req, res) => {
  console.log(req.body);
  if (req.body.object === 'page') {
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
          sendMessage(event);
        }
      });
    });
    res.send('No entry dude! Sorry for that');//This line is to check the server is woring properly or not
    //res.status(200).end();
  }
});




/*


const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Makeup = require('telegraf/makeup')


const keyboard = Makeup.inlineKeyboard({
  Makeup.urlButton('❤️', 'http://telegraf.js.org'),
  Makeup.callbackButton('Delete', 'delete')
})

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Hey there! I\'m DialogBot'))
bot.on('message', (ctx) => ctx.telegram.sendCopy(ctx.from.id, ctx.message, Extra.makeup(keyboard)))
bot.action('delete', ({deleteMessage}) => deleteMessage())
bot.startPolling()


*/
