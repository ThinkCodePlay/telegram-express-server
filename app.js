const { gameDeal } = require("./utils/cheapshark");

const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/bot", async (req, res) => {
  try {
    const isTelegramMessage =
      req.body &&
      req.body.message &&
      req.body.message.chat &&
      req.body.message.chat.id;
    if (isTelegramMessage) {
      const chat_id = req.body.message.chat.id;
      const text = req.body.message.text;
      const first_name = req.body.message.from.first_name;
      console.log(chat_id, text, first_name);

      const words = text.split(" ");
      const firstWord = words.shift();
      const gameName = words.join(" ");
      console.log(words, firstWord, gameName);

      switch (firstWord) {
        case "game":
          console.log("game");
          const deal = await gameDeal(gameName);
          return sendText(res, chat_id, deal);
          break;

        default:
          console.log("default");
          return sendText(
            res,
            chat_id,
            `Hi ${first_name}, to find a game deal type 'game' as a first word followed by the game title: \ngame <game title>`
          );
          break;
      }
    }
    else {
      console.log("not a valid message");
      return sendText(
        res,
        chat_id,
        `not a valid message`
      );
    }
  } catch (error) {
    console.log("error", error);
    return res.status(502).send(error);
  }
});

function sendText(res, chat_id, text) {
  console.log("send text", res, chat_id, text);
  return res.status(200).send({
    method: "sendMessage",
    chat_id,
    text,
  });
}

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
