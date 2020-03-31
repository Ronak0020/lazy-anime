const Discord = require('discord.js');
const covid = require('covidtracker');

module.exports = {
    name: "cstats",
    category: "info",
    description: "View the stats for corona cases.",
    usage: "<world | country <name> | state <name> >",
    aliases: ["corona", "covid-19", "coronastats", "cstat"],
    run: async(client, message, args) => {
        const all = await covid.getAll();
        const country = await covid.getCountry({country: args.slice(1).join(" ")});
        const state = await covid.getState({state: args.slice(1).join(" ")});
        const embed = new Discord.RichEmbed()
        .setTitle("🌎 COVID-19 UPDATES")
        .setFooter(client.user.username, client.user.displayAvatarURL)
        .setDescription(`**Total World cases :** ${all.cases.toLocaleString()}\n**Total Deaths :** ${all.deaths.toLocaleString()}\n**Total Recovered :** ${all.recovered.toLocaleString()}`)
        .setColor("RANDOM")
        if(args[0] === "world") return message.channel.send(embed);

        const countrye = new Discord.RichEmbed()
        .setTitle("🌎 COVID-19 UPDATES - " + args.slice(1).join(" "))
        .setFooter("Made by Ron")
        .setTimestamp()
        .setDescription(`**Total cases :** ${country.cases.toLocaleString()}\n**Today's Cases : ** ${country.todayCases.toLocaleString()}\n**Total Deaths :** ${country.deaths.toLocaleString()}\n**Today's Deaths : ** ${country.todayDeaths.toLocaleString()}\n**Total Recovered :** ${country.recovered.toLocaleString()}\n**Active Cases : ** ${country.active.toLocaleString()}\n**Critical Cases : ** ${country.critical.toLocaleString()}\n`)
        .setColor("RANDOM")
        if(args[0] === "country") return message.channel.send(countrye);

        const statee = new Discord.RichEmbed()
        .setTitle("🌎 COVID-19 UPDATES - " + args.slice(1).join(" "))
        .setFooter("Made by Ron")
        .setTimestamp()
        .setDescription(`**Total cases :** ${state.cases.toLocaleString()}\n**Today's Cases : ** ${state.todayCases.toLocaleString()}\n**Total Deaths :** ${state.deaths.toLocaleString()}\n**Today's Deaths : ** ${state.todayDeaths.toLocaleString()}\n**Total Recovered :** ${state.recovered.toLocaleString()}\n**Active Cases : ** ${state.active.toLocaleString()}\n**Critical Cases : ** ${state.critical.toLocaleString()}\n`)
        .setColor("RANDOM")
        if(args[0] === "state") return message.channel.send(statee);
        
    }
}
