const childProcess = require('child_process');
const guessEditor = require('./guessEditor');
const getEditorArguments = require('./getEditorArguments');
const { getOS } = require('./utils');

const sys = getOS();

function launchEditor(workspace = '', fileName = '', lineNum = 1, colNum = 1) {
    if (!workspace) {
        return;
    }

    const editor = guessEditor();
    if (!editor) {
        const errMsg = `Error: Could not find supported editors.`;
        console.error(errMsg);
        return new Error(errMsg);
    }
    console.log('---launch-editor:', editor, '---');

    const commandArgs = getEditorArguments({
        editor,
        fileName,
        lineNum,
        colNum,
        workspace
    });
    console.log('args:', commandArgs);

    let editorProcess = null;
    if (sys === 'windows') {
        // 在 windows 下需要通过 cmd.exe 唤起
        editorProcess = childProcess.spawn(
            'cmd.exe',
            ['/C', editor].concat(commandArgs),
            { stdio: 'inherit' }
        );
        console.log('spawn', `${['/C', editor].concat(commandArgs).join(' ')}`);
    } else {
        console.log('spawn', `${editor} ${commandArgs.join(' ')}`);
        editorProcess = childProcess.spawn(
            editor,
            commandArgs,
            { stdio: 'inherit' }
        );
    }

    editorProcess.on('exit', function (errorCode) {
        editorProcess = null;

        if (errorCode) {
            const errMsg = `Error[${errorCode}]: The editor process exited with an error.`;
            console.error(errMsg);
            return new Error(errMsg);
        }
    });

    editorProcess.on('error', function (error) {
        const errMsg = `Error[${error.name}]: Could not open editor.${error.message}.`;
        console.error(errMsg);
        return new Error(errMsg);
    });
}

module.exports = launchEditor;