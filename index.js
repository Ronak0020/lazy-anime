const { Client, Collection, RichEmbed } = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const mongoose = require('mongoose');
const Levels = require('discord-xp');
const giveaways = require("discord-giveaways");
const Profile = require("./modules/profile.js");
const Money = require("./modules/money.js");
const Module = require('./modules/module.js');
const AFK = require('./modules/afk.js');
const Stat = require("./modules/stats.js");
const dbURL = process.env.MONGODBURL;

mongoose.connect(dbURL, {
    useNewUrlParser: true
});

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();
client.invites = {};

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
    client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      client.invites[g.id] = guildInvites;
    });
  });
    giveaways.launch(client, {
        updateCountdownEvery: 10000,
        botsCanWin: false,
        ignoreIfHasPermission: [],
        embedColor: "#FFFF00",
        embedColorEnd: "#FFFFFF",
        reaction: "🎁",
        storage: __dirname + "/giveaways.json"
          });
});

client.on("message", async message => {
    if(message.author.bot) return;
    Money.findOne({
        serverID: message.guild.id,
        userID: message.author.id
    }, async(err, user) => {
        if(err) console.log(err);
        if(!user) {
            const newMoney = new Money({
                userID: message.author.id,
                serverID: message.guild.id, 
                coins: "0",
                bank: "0"
            })
            await newMoney.save().catch(e => console.log(e));
        }
        Profile.findOne({
            userID: message.author.id
        }, async(err, user) => {
            if(err) console.log(err);
            if(!user) {
                const newProfile = new Profile({
                    userID: target.id,
                    about: "Just a normal human",
                    petName: "",
                    married: "",
                    title: "LA member",
                    rep: "0"
                })
                await newProfile.save().catch(e => console.log(e))
            }
        })
    })
})

client.on('guildMemberAdd', member => {
  // To compare, we need to load the current invite list.
  member.guild.fetchInvites().then(guildInvites => {
    // This is the *existing* invites for the guild.
    const ei = client.invites[member.guild.id];
    // Update the cached invites for the guild.
    client.invites[member.guild.id] = guildInvites;
    // Look through the invites, find the one for which the uses went up.
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    const inviter = client.users.get(invite.inviter.id);
    // Get the log channel (change to your liking)
    //const logChannel = member.guild.channels.find(channel => channel.name === "join-logs");
    // A real basic message with the information we need. 
    //logChannel.send(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);
  });
});

client.on("message", async(message) => {
if(message.author.bot) return;
    let roleid = "";
    const club1 = message.guild.roles.find(r => r.id === "728979973230166196");
    const club2 = message.guild.roles.find(r => r.id === "728980035226173511");
    const club3 = message.guild.roles.find(r => r.id === "728980062908448818");
    const club4 = message.guild.roles.find(r => r.id === "728980098790981652");
    const club5 = message.guild.roles.find(r => r.id === "728980122618822738");
    if(!message.member.roles.has(club1.id) && !message.member.roles.has(club2.id) && !message.member.roles.has(club3.id) && !message.member.roles.has(club4.id) && !message.member.roles.has(club5.id)) return;
    roleid = club1.id;
    if(message.member.roles.has(club1.id)) {
        roleid = club1.id;
    } else
    if(message.member.roles.has(club2.id)) {
        roleid = club2.id;
    } else
    if(message.member.roles.has(club3.id)) {
        roleid = club3.id;
    } else
    if(message.member.roles.has(club4.id)) {
        roleid = club4.id;
    } else
    if(message.member.roles.has(club5.id)) {
        roleid = club5.id;
    }
    
    Stat.findOne({
      roleID: roleid  
    }, async(err, sta) => {
        if(err) console.log(err);
        if(!sta) {
            const newstat = new Stat({
                roleID: roleid,
                top: "",
                blacklisted: [],
                messages: 0,
                eventwins: 0
            })
            await newstat.save().catch(e => console.log(e));
        }
        if(sta.blacklisted.includes(message.channel.id)) return;
        sta.messages += 1;
        await sta.save().catch(e => console.log(e));
    })
})

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    const target = message.mentions.users.first() || message.author;
    AFK.findOne({
        guildID: message.guild.id,
        userID: target.id
    }, async(err, afk) => {
        if(err) console.log(err);
        if(message.author.id !== afk.userID) {
            message.reply(`**${target.username}** is currently AFK: ${afk.reason}`);
            } else {
                await afk.remove().catch(e => console.log(e));
                await message.reply("Welcome back! I removed you afk!").then(m => m.delete(5000));
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
