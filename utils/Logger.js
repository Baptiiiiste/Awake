const chalk = require("chalk");

const format = '{tag} {txt} \n'

function write(content, tagColor, tag, error = false){

    const logTag = `[${tag}]`;
    const stream = error ? process.stderr : process.stdout;

    const item = format
        .replace('{tag}', chalk[tagColor](logTag))
        .replace('{txt}', chalk.white(content));

    stream.write(item);
}


function error(content){
    write(content, 'red', 'ERREUR', true);
}

function warn(content){
    write(content, 'yellow', 'WARNING', false);
}

function typo(content){
    write(content, 'cyan', 'TYPO', false);
}

function command(content){
    write(content, 'magenta', 'COMMAND', false);
}

function event(content){
    write(content, 'green', 'EVENT', false);
}

function client(content){
    write(content, 'blue', 'BOT', false);
}


module.exports = { error, warn, event, command, typo, client }