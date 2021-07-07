const axios = require("axios").default;

const gameDeal = async (gameName) => {
  console.log('game deal', gameName);
  try {
    const response = await axios.get(
      `https://www.cheapshark.com/api/1.0/games?title=${gameName}`
    );

    if (response.data.length > 0) {
      console.log('res true');
      const gameData = `Game name: ${response.data[0].external}. \nCheapest price found: ${response.data[0].cheapest}. \nDeal Link: https://www.cheapshark.com/redirect?dealID=${response.data[0].cheapestDealID}`;
      console.log(gameData);
      return gameData;
    } else {
      console.log('res false');
      return "no deals found";
    }
  } catch (error) {
    console.log('api error', error);
    return "Sorry, got an error";
  }
};

module.exports = {
  gameDeal,
};
