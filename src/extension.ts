// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { LineChecker } from './LineChecker';

const NUMBER_OF_CHARS = 12;

type Character = {
	name: string;
	chance: number;
	img: string;
	quantity: number;
}

let userCollection = [
	{
		name: "Ami",
		chance: 1,
		img: "./images/char"
		
	}
]

let playerData = {
	points: 0,
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
		let lineChecker = new LineChecker([]);
		// For when the user is typing 
		vscode.workspace.onDidChangeTextDocument(async change => {

			// Check if there's an error in the file (stops reading)
			let diagnostics = vscode.languages.getDiagnostics().at(0)?.[1];
			if (diagnostics && diagnostics.length > 0) {
				return;
			}

			// get document
			let textDoc = change.document;

			// Checks to see if it's a file that's not a txt/md/plain file.
			let textFileName = textDoc.fileName.toLowerCase();
			const fileCheck = [".md", ".txt"].some(x => textFileName.includes(x))
			if (textFileName.includes(".") && !fileCheck) {

				//gets the text and splits it
				let text = textDoc.getText();
				let textLines = text.split("\n");
				console.log(textLines);

				// function to check conditions for points and returns # of points, adds it to the 
				lineChecker.setLines(textLines);
				console.log(lineChecker.getValidLines())

				context.globalState.update("points", playerData.points);
			}
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
