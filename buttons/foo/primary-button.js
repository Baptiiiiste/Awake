module.exports = {
    name: 'primary-button',
    async runInteraction(client, interaction)  {
        await interaction.member.roles.add("809401861940576306");
        await interaction.reply({content: "Je suis le bouton PRIMARY"});
    }
};

