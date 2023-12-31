const { ComponentType } = require("discord.js");

const utils = require("../utils");
const components = utils.getComponents();

async function exec(interaction) {
  const guild = interaction.guild;
  const username = interaction.user.username;

  const ticketChannel = await utils.createTextChannel(guild, username);

  if (interaction.customId == "buyingCurrency") {
    var amount = interaction.fields.getField("amountInput").value;
    var method = interaction.fields.getField("methodInput").value;

    const embedData = components.currencyTicketEmbed.embed(
      amount,
      method,
      ticketChannel,
    );

    await ticketChannel.send(embedData);
  } else {
    var itemsAndPrices = [];

    var items = interaction.customId;
    var items = items.split(", ");

    items.forEach((item) => {
      try {
        var newDict = {};

        newDict["name"] = item;
        newDict["price"] = utils.getDataForItem(item).price;

        itemsAndPrices.push(newDict);
      } catch (e) {
        //
      }
    });

    var robloxUsername = interaction.fields.getField("usernameInput").value;
    var tag = interaction.user.tag;

    const embedData = components.ticketEmbed.embed(
      itemsAndPrices,
      robloxUsername,
      tag,
      ticketChannel,
    );

    await ticketChannel.send(embedData);
  }
}

module.exports = { exec };
