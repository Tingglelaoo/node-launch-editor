module.exports = [
    {
        name: 'vscode',
        process: [
            '(.*\/code)',
        ],
        command: [
            'code',
        ],
        exepath: [
            '/usr/share/code/code',
        ],
    },
    {
        name: 'atom',
        process: [
            '(.*\/atom)',
        ],
        command: [
            'atom',
        ],
        exepath: [
            '/opt/atom/atom'
        ],
    },
    {
        name: 'sublime-text',
        process: [
            '(.*\/sublime_text)',
        ],
        command: [
            'subl',
        ],
        exepath: [
            '/opt/sublime_text/sublime_text',
        ],
    },
    {
        name: 'webstorm',
        process: [
            '(.*\/webstorm\.sh)',
        ],
        command: [
            'webstorm',
        ],
        exepath: [
        ],
    },
]
