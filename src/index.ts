import * as vscode from 'vscode';

export function getWebviewContent(initialImage: vscode.Uri): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gacha Ami</title>

    <style>
        body { font-family: sans-serif; text-align: center; padding: 20px; }
        .hidden { display: none; }
        
        #amiList { 
            display: flex; 
            flex-wrap: wrap; 
            justify-content: center; 
            gap: 20px; 
            margin-top: 20px; 
        }
        .ami-item { 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            width: 100px; 
        }
        .ami-item img { width: 80px; height: 80px; object-fit: contain; }
        .ami-item span { font-size: 14px; margin-top: 5px; font-weight: bold; }

        #controls { margin-top: 20px; }
        button { padding: 8px 16px; cursor: pointer; }
    </style>
</head>

<body>
    <div id="mainView">
        <img id="displayImage" src="${initialImage}" width="300" />
        <h1 id="pointsDisplay">Points: 0</h1>
        <div id="controls">
            <button id="spinButton">Spin</button>
            <button id="viewAmis">View Amis</button>
        </div>
    </div>

    <div id="collectionView" class="hidden">
        <h1>Your Amis</h1>
        <button id="backButton">Back to Machine</button>
        <div id="amiList"></div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        
        const mainView = document.getElementById('mainView');
        const collectionView = document.getElementById('collectionView');
        const amiList = document.getElementById('amiList');
        
        const img = document.getElementById('displayImage');
        const pointsTxt = document.getElementById('pointsDisplay');
        const spinBtn = document.getElementById('spinButton');
        const viewBtn = document.getElementById('viewAmis');
        const backBtn = document.getElementById('backButton');

        let currentPoints = 0;

        // Button Listeners
        spinBtn.addEventListener('click', () => {
            vscode.postMessage({ command: 'spin' });
        });

        viewBtn.addEventListener('click', () => {
            vscode.postMessage({ command: 'viewAmis' });
        });

        backBtn.addEventListener('click', () => {
            mainView.classList.remove('hidden');
            collectionView.classList.add('hidden');
        });

        // Communication from Extension
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
                case 'displayCollection':
                    showCollection(message.collection);
                    break;
            }
        });

        function showCollection(collection) {
            mainView.classList.add('hidden');
            collectionView.classList.remove('hidden');

            amiList.innerHTML = '';

            const owned = collection.filter(char => char.quantity > 0);

            if (owned.length === 0) {
                amiList.innerHTML = '<p>You haven\\'t won any Amis yet!</p>';
                return;
            }

            owned.forEach(char => {
                const item = document.createElement('div');
                item.className = 'ami-item';
                item.innerHTML = \`
                    <img src="\${char.webviewUri}" />
                \`;
                amiList.appendChild(item);
            });
        }
    </script>
</body>
</html>`;
}