var vscode = require('vscode');
var beeScript = require('./static/beeMovieScript.js');

var scriptLine = beeScript.scriptLine;
var scriptPara = beeScript.scriptPara;
// Pick a line/para at random
var randomLine = scriptLine[Math.floor(Math.random() * scriptLine.length)];
var randomPara = scriptPara[Math.floor(Math.random() * scriptPara.length)];

function activate(context) {
  var commands = [
    vscode.commands.registerCommand('jazz.line', insertText('line')),
    vscode.commands.registerCommand('jazz.para', insertText('para')),
  ];
// Register all commands
  commands.forEach(function (command) {
    context.subscriptions.push(command);
  });
}

function insertText(value) {
  var editor = vscode.window.activeTextEditor;
  editor.edit(
    edit => editor.selections.forEach(
      selection => {
        if(value === 'line'){
          edit.delete(selection);
          edit.insert(selection.start, randomLine);  
        }
        if(value === 'para'){
          edit.delete(selection);
          edit.insert(selection.start, randomPara);  
        }
      }
    )
  );
}

exports.activate = activate;
