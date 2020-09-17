const fs = require('fs');
const path = require('path');
const { isWSL } = require('./utils');

/**
 * 添加工作区到参数组中
 * @param {array} args       参数组
 * @param {string} workspace 工作区
 */
function addWorkspacetoArgs(args, workspace) {
    if (fs.existsSync(workspace)) {
        args.unshift(workspace);
    }
    console.log('add workspace', fs.existsSync(workspace))
    return args;
}

/**
 * 组装编辑器打开指定文件的参数
 * @param {object} 参数
 * @param {string} editor     编辑器
 * @param {string} fileName   打开文件名
 * @param {string} lineNum    打开定位文件的行数
 * @param {string} colNum     打开定位文件的列数
 * @param {string} workspace  工作区
 */
function getEditorArguments({
    editor = '',
    fileName = '',
    lineNum = 1,
    colNum = 1,
    workspace = '',
}) {
    let args = [];

    if (isWSL(fileName)) {
        fileName = path.relative('', fileName);
    }

    if (fs.existsSync(fileName)) {
        if (!(Number.isInteger(lineNum) && lineNum > 0)) {
            lineNum = 1;
        }

        if (!(Number.isInteger(colNum) && colNum > 0)) {
            colNum = 1;
        }

        const editorBasename = path.basename(editor).replace(/\.(exe|cmd|bat|sh)$/i, '');
        console.log('editorBasename', editorBasename);
        switch(editorBasename) {
            case 'atom':
            case 'Atom':
            case 'subl':
            case 'sublime_text':
            case 'Sublime Text':
                // subl  ~/project/launch-editor/guessApp.js:10:8 ~/project/launch-editor
                // atom  ~/project/launch-editor/guessApp.js:10:8 ~/project/launch-editor
                args = args.concat([`${fileName}:${lineNum}:${colNum}`]);
                break;
            case 'code':
            case 'Code':
            case 'Electron':
                // code  -g ~/project/launch-editor/guessApp.js:10:8 ~/project/launch-editor
                args = args.concat(['-g', `${fileName}:${lineNum}:${colNum}`]);
                console.log(args);
                break;
            case 'webstorm':
            case 'webstorm64':
                // webstorm  -line 10 ~/project/launch-editor/guessApp.js ~/project/launch-editor
                args = args.concat(['--line', lineNum, fileName]);
                break;
            default:
                break;
        }
    }

    args = addWorkspacetoArgs(args, workspace);
    return args;
}


module.exports = getEditorArguments;