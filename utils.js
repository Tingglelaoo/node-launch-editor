const os = require('os');
const process = require('process');

/**
 * 获取操作系统类型
 * @return {String} 'windows'|'osx'|'linux'
 */
function getOS() {
    if (typeof process === 'undefined') {
        return undefined;
    }

    let plat = process.platform;
    if (plat === 'win32') return 'windows';
    if (plat === 'darwin') return 'osx';
    if (plat === 'linux') return 'linux';
    return undefined;
}

/**
 * 判断是否为在 Windows 操作子系统 Linux 打开的文件
 * @param {string} fileName 文件路径
 */
function isWSL(fileName) {
    return getOS() === 'linux' && fileName.startsWith('/mnt/') && /Microsft/i.test(os.release());
}

module.exports = {
    getOS,
    isWSL,
}
