//This is for tesing purpose of Telegram Bot DialogBot.
//It can answer only for weather details unil now.
//This code will echo the message sent.

//****************Testing for the server is working or not***********************






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
