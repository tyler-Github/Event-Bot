const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'setlogchannel',
    description: "Set the log channel for the server.",
    cooldown: 3000,
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ManageChannels', // permission required
    options: [
        {
            name: 'channel',
            description: 'The channel you want to set as the log channel.',
            type: ApplicationCommandOptionType.Channel,
            required: true
        }
    ],
    run: async (client, interaction) => {
        try {
            const channel = interaction.options.get('channel').channel;
            const logs = JSON.parse(fs.readFileSync('./logs.json'));
            logs[interaction.guild.id] = channel.id;
            fs.writeFileSync('./logs.json', JSON.stringify(logs));

            const embed = new EmbedBuilder()
                .setTitle('Log Channel Set')
                .setDescription(`Successfully set the log channel to ${channel}`)
                .setColor('Green')
                .setTimestamp()
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

            return interaction.reply({ embeds: [embed] });
        } catch (err) {
            console.log(err);
            return interaction.reply({ content: `Sorry, I failed to set the log channel...`, ephemeral: true });
        }
    }
};