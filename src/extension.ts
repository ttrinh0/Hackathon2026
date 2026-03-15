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

let userCollection1 = [
	{
		name: "Ami",
		chance: 1,
		img: "./images/char"

	}
]

let userCollection = Object({

})

let playerData = {
	saveData: false,
	points: 0,
	collection: userCollection
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	if (context.globalState.get("saveData") === undefined) {
		context.globalState.update("saveData", true);
		context.globalState.update("points", playerData.points);
		context.globalState.update("collection", playerData.collection);
	} else {
		playerData.saveData = true;
		playerData.points = context.globalState.get("points") ?? 0;
		playerData.collection = context.globalState.get("collection") ?? userCollection
	}

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "gachaami" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('gachaami.startTracking', () => {
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

				// function to check conditions for points and returns # of points, adds it to user data 
				if (lineChecker.getNumberOfValidLines === 0) {
					lineChecker.setInitialLines(textLines);
				}
				else {
					// Checks if the player has made a new line
					if (textLines[textLines.length - 1] == '') {
						// this is when it checks for the points
						let pointsGained = lineChecker.compareLines(textLines);
						let currentPoints: number = context.globalState.get("points") ?? 0;
						context.globalState.update("points", currentPoints + pointsGained)
					}
				}
				console.log(context.globalState.get("points"))
			}
		})
	});


	const check = vscode.commands.registerCommand('gachaami.resetData', () => {
		context.globalState.update("saveData", undefined)
	})


	context.subscriptions.push(disposable);
	context.subscriptions.push(check);
}

// This method is called when your extension is deactivated
export function deactivate() { }
