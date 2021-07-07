const { gameDeal } = require("./utils/cheapshark");

const express = require("express");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.post("/bot", async (req, res) => {
  try {
    const chat_id = req.body.message.chat.id;
    const text = req.body.message.text;
    const first_name = req.body.message.from.first_name;

    const words = text.split(" ");
    const firstWord = words.shift();
    const gameName = words.join(" ");
    switch (firstWord) {
      case "game":
        const deal = await gameDeal(gameName);
        return sendText(
          res,
          chat_id,
          `Here's the best deal i found: \n${deal}`
        );
        break;

      default:
        return sendText(
          res,
          chat_id,
          `Hi ${first_name}, to find a game deal type game as a first word followed by the game title: \ngame <game title>`
        );
        break;
    }
  } catch (error) {
    return res.status(502).send({ error, req, res });
  }
});

function sendText(res, chat_id, text) {
  return res.status(200).send({
    method: "sendMessage",
    chat_id,
    text: text,
  });
}

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
