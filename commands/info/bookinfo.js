const Discord = require("discord.js");
const snekfetch = require("snekfetch");

module.exports = {
    name: "bookinfo",
    category: "info",
    aliases: ["bi", "book"],
    usage: "<Book name>",
    description: "Shows info for a book.",
    run: async(client, message, args) => {
        try {
            const query = args.join(' ');
            if (query < 1) return message.channel.send("Didnt provide a book title to search for.")
                    const { body } = await snekfetch
                        .get('https://www.googleapis.com/books/v1/volumes')
                        .query({
                            maxResults: 1,
                            q: query,
                            //maxAllowedMaturityRating: "NOT_MATURE",
                            key: process.env.BOOK_API
                        });
                    const description = body.items[0].volumeInfo.description
                    const descriptionfix = description.substr(0, 600);
                    const embed = new Discord.RichEmbed()
                        .setColor(0x00A2E8)
                        .setTitle(body.items[0].volumeInfo.title)
                        .addField("Author(s) ", body.items[0].volumeInfo.authors)
                        .addField("Publisher ", body.items[0].volumeInfo.publisher)
                        .addField("Page Count", body.items[0].volumeInfo.pageCount)
                        .addField("Genres" , body.items[0].volumeInfo.categories.length ? body.items[0].volumeInfo.categories.join(', ') : '???')
                        .addField("Description", body.items[0].volumeInfo.description ? descriptionfix : 'No description available.')
                        .addField("Purchase link:", body.items[0].volumeInfo.canonicalVolumeLink)
                        .setThumbnail(body.items[0].volumeInfo.imageLinks.thumbnail)
                        .setFooter(message.author.username, message.author.displayAvatarURL)
                        .setTimestamp();
                    message.channel.send(embed)
                    } catch (err) {
                        console.log(err)
                    }
    }
}