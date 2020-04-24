const Discord = require('discord.js');
const fetch = require("snekfetch");

module.exports = {
    name: "corona",
    category: "info",
    description: "View the stats for corona cases.",
    usage: "<world | country <name> >",
    aliases: ["covid-19", "coronastats", "cstats", "covid"],
    run: async(client, message, args) => {
        if(args[0].toLowerCase() === "world") {
        fetch.get("https://corona.lmao.ninja/v2/all?yesterday=false").then(data => {
            const body = data.body;
            const world = new Discord.RichEmbed()
            .setTitle("🌎 COVID-19 UPDATES")
            .setColor("RED")
            .setDescription(`**Total Cases:** ${body.cases}\n**Today's Cases:** ${body.todayCases}\n**Total Deaths:** ${body.deaths}\n**Today's Deaths:** ${body.todayDeaths}\n**Recovered:** ${body.recovered}\n**Critical cases:** ${body.critical}\n**Total Active Cases:** ${body.active}`)
            .setFooter("Developer: Ronak#0020")
            .setTimestamp()
            message.channel.send(world)
        })
    } else if(args[0].toLowerCase() === "country") {
        if(!args[1]) return message.reply("Please provide the name of the country with the command.").then(m => m.delete(5000));
        fetch.get(`https://corona.lmao.ninja/v2/countries/${args[1]}?yesterday=false&strict=false`).then(data => {
            const body = data.body;
            const country = new Discord.RichEmbed()
            .setTitle("🌎 COVID-19 UPDATES - " + args[1])
            .setThumbnail(body.countryInfo.flag)
            .setColor("RED")
            .setDescription(`**Total Cases:** ${body.cases}\n**Today's Cases:** ${body.todayCases}\n**Total Deaths:** ${body.deaths}\n**Today's Deaths:** ${body.todayDeaths}\n**Recovered:** ${body.recovered}\n**Critical cases:** ${body.critical}\n**Total Active Cases:** ${body.active}`)
            .setFooter("Developer: Ronak#0020")
            .setTimestamp()
            message.channel.send(country)
        })
    }
        
    }
}
