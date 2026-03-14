// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const NUMBER_OF_CHARS = 12;

type Character = {
	name: string;
	chance: number;
	img: string;
	quantity: number;
}

let userCollection = new Object({
	
});


let playerData = {
	point: 0,
	coins: 0,
	collection: userCollection
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "gachaami" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('gachaami.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from GachaAmi!');

		// For when the user is typing 
		vscode.workspace.onDidChangeTextDocument(async change => {
			let textDoc = change.document;
			let text = textDoc.getText();
			console.log(text);
			console.log(textDoc.fileName);
			context.globalState.update("textCount", text.length);
		})

		
	});


	const check = vscode.commands.registerCommand('gachaami.checkData', () => {
		let textCount = context.globalState.get("textCount");
		if (textCount) {
			console.log(textCount);
		} else {
			console.log("none");
		}
	})

	context.subscriptions.push(disposable);
	context.subscriptions.push(check);
}

// This method is called when your extension is deactivated
export function deactivate() { }
