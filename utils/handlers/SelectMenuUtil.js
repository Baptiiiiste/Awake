const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const Logger = require("../Logger");

module.exports = async client => {
    (await pGlob(`${process.cwd()}/selectMenu/*/*.js`)).map(async selectMenuFile =>{
        const slctMenu = require(selectMenuFile);

        if(!slctMenu.name) return Logger.warn(`SelectMenu not loaded (Missing name): ${selectMenuFile}`);

        client.selectMenu.set(slctMenu.name, slctMenu);
    });
};




