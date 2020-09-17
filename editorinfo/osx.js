const path = require('path');
module.exports = [
    {
        name: 'vscode',
        process: [
            '(\/Applications\/Visual Studio Code\.app\/Contents\/MacOS\/Electron)',
        ],
        command: [
            'code',
        ],
        exepath: [
            path.join('/','Applications','Visual Studio Code.app','Contents','Resources','app','bin','code'),
        ],
    },
    {
        name: 'atom',
        process: [
            '(\/Applications\/Atom\.app\/Contents\/MacOS\/Atom)',
        ],
        command: [
            'atom',
        ],
        exepath: [
            path.join('/','Applications','Atom.app','Contents','Resources','app','atom.sh'),
        ],
    },
    {
        name: 'sublime-text-3',
        process: [
            '(\/Applications\/Sublime Text\.app\/Contents\/MacOS\/Sublime Text)',
        ],
        command: [
            'subl',
        ],
        exepath: [
            path.join('/','Applications','Sublime Text.app','Contents','SharedSupport','bin','subl'),
        ],
    },
    {
        name: 'sublime-text-2',
        process: [
            '(\/Applications\/Sublime Text 2\.app\/Contents\/MacOS\/Sublime Text)',
        ],
        command: [
            'subl',
        ],
        exepath: [
            path.join('/','Applications','Sublime Text 2.app','Contents','SharedSupport','bin','subl'),
        ],
    },
    {
        name: 'webstorm',
        process: [
            '(\/Applications\/WebStorm\.app\/Contents\/MacOS\/webstorm)',
        ],
        command: [
            'wstorm',
            'webstorm'
        ],
        exepath: [
            path.join('/','Applications','WebStorm.app','Contents','MacOS','webstorm'),
        ],
    },
]