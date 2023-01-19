const fs = require('fs')
const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
	id: 'rsvp_button_leave',
	permissions: [],
	run: async (client, interaction) => {
        try {
            // Get current attendee list
            let attendeeList = JSON.parse(fs.readFileSync('./attending.json'));
            // Add new attendee
            let eventName = interaction.message.embeds[0].title.split(' ')[0]; // assuming the event name is the first word in the title
            attendeeList.push({username: interaction.user.username, event: eventName});
            // Save new attendee list
            fs.writeFileSync('./attending.json', JSON.stringify(attendeeList));
            console.log(attendeeList)
            return interaction.reply({ content: `✅ ${interaction.user}, You have left the event.`, ephemeral: true });
        } catch (err) {
            console.log(err)
            return interaction.reply({ content: `Sorry, I failed to leave the event...`, ephemeral: true });
        }
	}
};
