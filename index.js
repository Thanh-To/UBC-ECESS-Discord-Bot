const Discord = require("discord.js");

const bot = new Discord.Client();

const approvedRoles = new Set([
                        "2nd-year-cpen",
                        "2nd-year-elec",
                        "3rd-year-cpen",
                        "3th-year-elec",
                        "4th-year-cpen",
                        "4th-year-elec",
                        "alumni"]);

bot.login(''); //Put Bot Token here

bot.on("ready", () => {
    console.log("Logged in as " + bot.user.tag);
});

bot.on("message", (message) => {
    if (message.mentions.has(bot.user)) {
        try {
            let args = message.content.split(" ").filter(function (element) {
                return element.length > 0;
            });
            console.log(args);
            let command = (args.length > 0) ? args[1] : "";

            if (command == ".iam") {
                let roleName = args[2];
                let role = message.guild.roles.cache.find(role => role.name === roleName);

                if (role != null && approvedRoles.has(role.name)) {
                    message.member.roles.add(role);
                    reply(message, "You are now a " + role.name);
                } else {
                    reply(message, "You tried to self assign an invalid role");
                }
            } else if (command == ".iamnot") {
                let roleName = args[2];
                let role = message.guild.roles.cache.find(role => role.name === roleName);
                if (role != null && approvedRoles.has(role.name)) {
                    message.member.roles.remove(role);
                    reply(message, "You are no longer " + role.name);
                } else {
                    reply(message, "You tried to self remove an invalid role");
                }
            } else {
                reply(message, 
`Sorry, I don't understand that. 
To self assign a new role, send a message that reads "@VPDoggo .iam [role]".
To self remove a role, send a message that reads "@VPDoggo .iamnot [role]".
The available roles are: 
- 2nd-year-cpen
- 2nd-year-elec
- 3rd-year-cpen
- 3th-year-elec
- 4th-year-cpen
- 4th-year-elec
- alumni`
                );
            }
            message.delete({timeout: 10000 });
        } catch (e) {
            console.log(message);
            console.log(e.stack);
            reply(message, "Sorry, something went wrong.");
        }
    }
});

function reply(request, responseMessage) {
    request.reply(responseMessage)
    .then(reply => {
        reply.delete({timeout: 10000 })
    });
}