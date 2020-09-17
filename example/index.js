const launchEditor = require('../index');
const { getOS } = require('../utils');

const sys = getOS();

if (sys === 'windows') {
    launchEditor('C:\\Users\\tentenli\\Downloads\\launch-editor', 'C:\\Users\\tentenli\\Downloads\\launch-editor\\guessEditor.js', 10, 1);
    return;
}

if (sys === 'linux') {
    launchEditor('/mnt/c/Users/tentenli/Downloads/launch-editor', '/mnt/c/Users/tentenli/Downloads/launch-editor/guessEditor.js', 10, 1);
    return;
}

if (sys === 'osx') {
    launchEditor('/Users/ting/project/launch-editor', '/Users/ting/project/launch-editor/guessEditor.js', 10, 1);
    return;
}