const { gameDeal } = require("./utils/cheapshark");

const bodyParser = require('body-parser');
// const TelegramBot = require("node-telegram-bot-api");
// const token = process.env.TELEGRAM_BOT_TOKEN;
// const bot = new TelegramBot(token, { polling: false });

const express = require("express");
const port = 3000;

const app = express();
app.use(bodyParser.json());

app.post("/bot", async (req, res) => {
  try {
      console.log('im in bot');
      console.log('req.body', req.body);
    // const chat_id = req.body.message.chat.id;
    // const text = req.body.message.text;
    return sendText(res, 40131852, `Hi there I got your message: im a bot`);
  } catch (error) {
      return res.status(502).send({error, req, res})
  }
});

function sendText(res, chat_id, text) {
  return res.status(200).send({
    method: "sendMessage",
    chat_id,
    text: text,
  });
}

// bot.onText(/\/game (.+)/, async (msg, match) => {
//   const chatId = msg.chat.id;
//   const gameName = match[1];

//   const deal = await gameDeal(gameName);
//   bot.sendMessage(chatId, deal);
// });

// bot.on('message', (msg) => {
//     console.log(msg);
//     const chatId = msg.chat.id;

//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Received your message');
//   });

// app.get('/bot', function (req, res) {
//   res.send('Hello World')
// })

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
