/**
 * 编辑器嗅探，获取用户正在使用的编辑器，步骤如下：
 * 1. 从进程中检查正在使用的编辑器  => 返回命中关键字
 * 2. 检查全局命令 => 返回命令
 * 3. 检查执行路径 => 返回执行路径
 */
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const COMMON_EDITORS_OSX = require('./editorinfo/osx');
const COMMON_EDITORS_WIN = require('./editorinfo/windows');
const COMMON_EDITORS_LINUX = require('./editorinfo/linux');
const commandExisted = require('./commandExisted');
const { getOS } = require('./utils');

const sys = getOS();

/**
 * 检查编辑器的全局命令是否存在
 * @param {array} command 命令组
 * @returns {undefined|string} 若存在，返回该命令；若不存在，返回 undefined;
 */
function checkCommand(command) {
    let commandResult = '';
    const commandBy = command.some(commandName => {
        const result = commandExisted(commandName);
        if (result) {
            commandResult = commandName;
        }
        return result;
    })

    console.log('commandBy', commandBy);
    if (commandBy) {
        console.log('command', commandResult);
        return commandResult;
    }

    return undefined;
}

/**
 * 检查编辑器默认安装路径的执行文件位置是否存在
 * @param {array} exepath 执行文件位置组
 * @returns {undefined|string} 若存在，返回该执行文件位置；若不存在，返回 undefined;
 */
function checkExePath(exepath) {
    let exeResult = '';
    const exeBy = exepath.some(exefile => {
        const result = fs.existsSync(exefile);
        console.log('exefile', exefile, result);
        if (result) {
            exeResult = exefile;
        }
        return result;
    })

    console.log('exeBy', exeBy);
    if (exeBy) {
        console.log('exefile', exeResult);
        return exeResult;
    }

    return undefined;
}

module.exports = function guessEditor() {
    try {
        let output = '';
        let runningProcesses = '';
        let editorInfo = [];

        if (sys === 'windows') {
            // 获取进程信息
            editorInfo = COMMON_EDITORS_WIN;
            output = childProcess.execSync('wmic process where "executablepath is not null" get executablepath').toString();
            runningProcesses = output.split('\r\n');
        }

        if (sys === 'osx' || sys === 'linux') {
            editorInfo = sys === 'osx' ? COMMON_EDITORS_OSX : COMMON_EDITORS_LINUX;
            output = childProcess.execSync('ps x -o command').toString();
            runningProcesses = output.split('\n');
        }

        for (let i = 0; i < editorInfo.length; i++) {
            const { name, process, command, exepath } = editorInfo[i];
            console.log('-----guess editor: ', name, '-----');

            // 从进程中检查
            let processResult = '';
            const processBy = runningProcesses.some(exefile => {
                const result = process.some(processKey => {
                const reg = new RegExp(processKey);
                    const match = exefile.match(reg);
                    if (match) {
                        processResult = match[1];
                    }
                    return match;
                })

                return result;
            });

            console.log('processBy', processBy);
            if (processBy) {
                console.log('process', processResult);
                return processResult;
            }

            // 检查全局命令
            const cmd = checkCommand(command);
            if (cmd) {
                return cmd;
            }

            // 检查默认执行路径
            const exe = checkExePath(exepath);
            if (exe) {
                return exe;
            }
        }

        return undefined;
    }
    catch(err) {
        // Ignore...
        console.error(err);
    }
}
