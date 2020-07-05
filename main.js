var vscode = require('vscode');
var beeScript = require('./source/beeMovieScript.js');

var scriptLine = beeScript.scriptLine;
var scriptPara = beeScript.scriptPara;

function activate(context) {
  var commands = [
    vscode.commands.registerCommand('jazz.line', insertLine),
    vscode.commands.registerCommand('jazz.para', insertPara),
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
        edit.delete(selection);
        // Pick a line at random
        if(value === 'line'){
          let randomLine = scriptLine[Math.floor(Math.random() * scriptLine.length)];
          edit.insert(selection.start, randomLine);  
        }
        // Pick a para at random
        if(value === 'para'){
          let randomPara = scriptPara[Math.floor(Math.random() * scriptPara.length)];
          edit.insert(selection.start, randomPara);  
        }
      }
    )
  );
}

function insertLine(){
  insertText('line');
}

function insertPara(){
  insertText('para');
}

exports.activate = activate;
