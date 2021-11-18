require('dotenv').config()
const { Telegraf, Markup } = require('telegraf')
const text = require('./const')


const bot = new Telegraf(process.env.BOT_TOKEN)

// bot.start((ctx) => ctx.reply(`Приветствую тебя ${ctx.message.from.first_name}, Добро пожаловать в NinjaSaleBot!`))



bot.start( async (ctx) =>  {
    try {
        await ctx.replyWithHTML(text.message, Markup.inlineKeyboard([
                [Markup.button.callback('🔥 Получить подарок 🔥', 'btn_1')]
            ]
        ))
    } catch (e) {
        console.error(e)
    }
})

bot.action('btn_1', async (ctx) => {
    try {
        ctx.answerCbQuery()
       await ctx.replyWithHTML(text.gift, {
            disable_web_page_preview: true
        })

        await ctx.replyWithHTML(text.subscribe, {
            disable_web_page_preview: false
        })

    } catch (e) {
        console.error(e)
    }
})


bot.help((ctx) => ctx.reply(text.commands))
bot.start()
bot.launch()


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))