"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const LineChecker_1 = require("./LineChecker");
const NUMBER_OF_CHARS = 12;
let userCollection = [
    {
        name: "Ami",
        chance: 1,
        img: "./images/char"
    }
];
let playerData = {
    saveData: false,
    points: 0,
    collection: userCollection
};
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    if (context.globalState.get("saveData") === undefined) {
        context.globalState.update("saveData", true);
        context.globalState.update("points", playerData.points);
        context.globalState.update("collection", playerData.collection);
    }
    else {
        playerData.saveData = true;
        playerData.points = context.globalState.get("points") ?? 0;
        playerData.collection = context.globalState.get("collection") ?? userCollection;
    }
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
        let lineChecker = new LineChecker_1.LineChecker([]);
        // For when the user is typing 
        vscode.workspace.onDidChangeTextDocument(async (change) => {
            // Check if there's an error in the file (stops reading)
            let diagnostics = vscode.languages.getDiagnostics().at(0)?.[1];
            if (diagnostics && diagnostics.length > 0) {
                return;
            }
            // get document
            let textDoc = change.document;
            // Checks to see if it's a file that's not a txt/md/plain file.
            let textFileName = textDoc.fileName.toLowerCase();
            const fileCheck = [".md", ".txt"].some(x => textFileName.includes(x));
            if (textFileName.includes(".") && !fileCheck) {
                //gets the text and splits it
                let text = textDoc.getText();
                let textLines = text.split("\n");
                // console.log(textLines);
                // function to check conditions for points and returns # of points, adds it to user data 
                if (lineChecker.getNumberOfValidLines === 0) {
                    lineChecker.setInitialLines(textLines);
                }
                else {
                    if (textLines[textLines.length - 1] == '') {
                        let pointsGained = lineChecker.compareLines(textLines);
                        let currentPoints = context.globalState.get("points") ?? 0;
                        context.globalState.update("points", currentPoints + pointsGained);
                    }
                }
                console.log(context.globalState.get("points"));
            }
        });
    });
    const check = vscode.commands.registerCommand('gachaami.checkData', () => {
        let textCount = context.globalState.get("textCount");
        if (textCount) {
            console.log(textCount);
        }
        else {
            console.log("none");
        }
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(check);
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map