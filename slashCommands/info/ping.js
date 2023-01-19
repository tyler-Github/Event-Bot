const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	name: 'ping',
	description: "Check bot's ping.",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {

		const embed = new EmbedBuilder()
		.setTitle(`Bot's Ping`)
		.addFields({ name: 'Ping Latency:', value: `${(Date.now() - interaction.createdTimestamp) / 1000} `}) 
		.addFields({ name: 'API Latency:', value: `${Math.round(client.ws.ping) / 1000}`}) 
		.setColor('Green')
		.setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

		interaction.reply({embeds: [embed]})
	}
};