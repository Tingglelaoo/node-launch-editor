const childProcess = require('child_process');
const { getOS } = require('./utils');

function commandExisted(commandName) {
    const sys = getOS();

    if (sys === 'windows') {
        try {
            const stdout = childProcess.execSync(`where ${commandName}`, {stdio: []});
            return !!stdout;
        } catch (error) {
            return false;
        }
    }
    
    if (sys === 'osx' || sys === 'linux') {
        try {
            const stdout = childProcess.execSync(`command -v ${commandName}`);
            return !!stdout;
        } catch (error) {
            return false;
        }
    }
}

module.exports = commandExisted;