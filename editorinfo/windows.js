const os = require('os');
const path = require('path');

module.exports = [
    {
        name: 'vscode',
        process: [
            '(.*Code\.exe)',
        ],
        command: [
            'code',
        ],
        exepath: [
            path.join(os.homedir(), 'AppData', 'Local', 'Programs', 'Microsoft VS Code', 'bin', 'code.cmd'),
            path.join(os.homedir(), '..', '..', 'Program Files', 'Microsoft VS Code', 'bin', 'code.cmd'),
            path.join(os.homedir(), '..', '..', 'Program Files (x86)', 'Microsoft VS Code', 'bin', 'code.cmd'),
        ],
    },
    {
        name: 'atom',
        process: [
            '(.*atom\.exe)',
        ],
        command: [
            'atom',
        ],
        exepath: [
            path.join(os.homedir(), 'AppData', 'Local', 'atom', 'bin', 'atom'),
        ],
    },
    {
        name: 'sublime-text',
        process: [
            '(.*sublime_text\.exe)',
        ],
        command: [
            'subl',
        ],
        exepath: [
            path.join(os.homedir(), '..', '..', 'Program Files', 'Sublime Text 3', 'subl.exe'),
            path.join(os.homedir(), '..', '..', 'Program Files', 'Sublime Text', 'subl.exe'),
        ],
    },
    {
        name: 'webstorm',
        process: [
            '(.*webstorm\.exe)',
            '(.*webstorm64\.exe)',
        ],
        command: [
            'webstorm',
        ],
        exepath: [
            path.join(os.homedir(), '..', '..', 'Program Files','JetBrains','WebStorm','bin','webstorm'),
            path.join(os.homedir(), '..', '..', 'Program Files','JetBrains','WebStorm','bin','webstorm64.exe'),
        ],
    },
]
