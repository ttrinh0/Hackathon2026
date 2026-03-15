import * as vscode from 'vscode';

export function getWebviewContent(initialImage: vscode.Uri): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gacha Ami</title>
</head>
<body>
    <img id="displayImage" src="${initialImage}" width="300" />
    <h1 id="pointsDisplay">Points: 0</h1>
    <button id="spinButton">Spin</button>
    <button id="viewAmis">View Amis</button>

    <script>
        const vscode = acquireVsCodeApi();
        const img = document.getElementById('displayImage');
        const pointsTxt = document.getElementById('pointsDisplay');
        const spinBtn = document.getElementById('spinButton');
        
        spinBtn.addEventListener('click', () => {
            vscode.postMessage({ command: 'spin' });
        });

        window.addEventListener('message', event => {
            const message = event.data; 

            switch (message.command) {
                case 'updateImage':
                    img.src = message.url;
                    break;
                case 'updatePoints':
                    currentPoints = message.points;
                    pointsTxt.innerText = "Points: " + currentPoints;
                    spinBtn.disabled = currentPoints < 100;
                    break;
            }
        });


    </script>
</body>
</html>`;
}