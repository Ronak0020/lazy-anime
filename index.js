const { Client, Collection, RichEmbed } = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const mongoose = require('mongoose');
const Levels = require('discord-xp');
const Module = require('./modules/module.js');
const AFK = require('./modules/afk.js');
const dbURL = process.env.MONGODBURL;

mongoose.connect(dbURL, {
    useNewUrlParser: true
});

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "me getting developed",
            type: "STREAMING"
        }
    }); 
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    const target = message.author || message.mentions.users.first();
    AFK.findOne({
        guildID: message.guild.id,
        userID: target.id
    }, async(err, afk) => {
        if(err) console.log(err);
        if(message.author.id !== afk.userID) {
            message.reply(`**${target.username}** is currently AFK: ${afk.reason}`);
            } else {
                await message.reply("Welcome back! I removed you afk!").then(m => m.delete(5000));
                await afk.remove().catch(e => console.log(e));
            }
    })
})

client.on("message", async message => {
    Module.findOne({
        guildID: message.guild.id
    }, async(err, server) => {
        if(err) console.log(err);
        if(!server) {
            const newModule = new Module({
                guildID: message.guild.id,
                levelModule: "on",
                coinModule: "on",
                prefix: "la!",
                logChannel: "logs"
            });
            await newModule.save().catch(e => console.log(e));
        }
    
    if(server.levelModule === "on") {
        if(message.author.bot) return;
        const randomAmountOfXp = Math.floor(Math.random() * 9) + 1;
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
        if (hasLeveledUp) {
          const user = await Levels.fetch(message.author.id, message.guild.id);
          const lvlup = new RichEmbed()
          .setTitle("Level Up! :tada:")
          .setDescription(`Congratulations __**${message.author.tag}**__! You have leveled up! Keep it up!\n**New Level:** **${user.level}**`)
          .setColor('RANDOM')
          .setFooter("Developed by **Ronak#0020**", client.user.displayAvatarURL)
          .setTimestamp()
          message.channel.send(`${message.author}`, lvlup);
        }
    }

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(server.prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(server.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
    })
});

client.login(process.env.token);
