document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.getElementById('terminal-content');
    let currentLine = document.getElementById('current-line');
    let commandHistory = [];
    let historyIndex = -1;
    let currentCommand = '';

    const commands = {
        'help': () => {
            return `Mevcut Komutlar:
youtube    - Youtube kanalımı ziyaret et
github     - GitHub profilimi ziyaret et
instagram  - Instagram profilimi ziyaret et
clear      - Terminal ekranını temizle`;

        },
        'yardım': () => {
            return `Mevcut Komutlar:
youtube    - Youtube kanalımı ziyaret et
github     - GitHub profilimi ziyaret et
instagram  - Instagram profilimi ziyaret et
clear      - Terminal ekranını temizle`;

        },
        'clear': () => {
            terminalContent.innerHTML = `
                <div class="line">
                    <span class="prompt">C:\\Users\\guest></span>
                    <span class="command" id="current-line" contenteditable="true"></span>
                </div>
            `;
            currentLine = terminalContent.querySelector('#current-line');
            currentLine.focus();
            return null;
        },
        'youtube': () => { 
            window.open('https://www.youtube.com/@n0xiibey', '_blank');
            return 'Youtube kanalını açıyorum...';
        },
        'github': () => { 
            window.open('https://github.com/noxiiwqe', '_blank');
            return 'Github profilini açıyorum...';
        },
        'instagram': () => { // Example: instagram.com/mehdikamb
            window.open('https://instagram.com/n0xiwqe', '_blank');
            return 'Instagram profilini açıyorum...';
        }
    };

    terminalContent.addEventListener('click', () => {
        currentLine.focus();
    });

    document.addEventListener('keydown', (e) => {
        if (!terminalContent.contains(document.activeElement)) return;

        switch(e.key) {
            case 'Enter':
                e.preventDefault();
                processCommand();
                break;
            case 'Backspace':
                if (currentCommand.length > 0) {
                    currentCommand = currentCommand.slice(0, -1);
                    updateCurrentLine();
                }
                e.preventDefault();
                break;
            case 'ArrowUp':
                navigateHistory('up');
                e.preventDefault();
                break;
            case 'ArrowDown':
                navigateHistory('down');
                e.preventDefault();
                break;  
            default:
                if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
                    currentCommand += e.key;
                    updateCurrentLine();
                    e.preventDefault();
                }
        }
    });

    function processCommand() {
        const cmd = currentCommand.trim().toLowerCase();
        
        if (cmd === 'clear') {
            commands['clear']();
        } else {
            const commandDiv = document.createElement('div');
            commandDiv.className = 'line';
            commandDiv.innerHTML = `<span class="prompt">C:\\Users\\guest></span><span class="command-text">${currentCommand}</span>`;
            
            const lastLine = terminalContent.lastElementChild;
            terminalContent.removeChild(lastLine);
            
            terminalContent.appendChild(commandDiv);

            if (currentCommand.trim()) {
                const output = document.createElement('div');
                output.className = 'output';

                if (commands[cmd]) {
                    const result = commands[cmd]();
                    if (result !== null) {
                        output.textContent = result;
                        terminalContent.appendChild(output);
                    }
                } else {
                    output.textContent = `'${currentCommand}' is not recognized as an internal or external command.`;
                    terminalContent.appendChild(output);
                }
            }

            const newLine = document.createElement('div');
            newLine.className = 'line';
            newLine.innerHTML = `
                <span class="prompt">C:\\Users\\guest></span>
                <span class="command" id="current-line" contenteditable="true"></span>
            `;
            terminalContent.appendChild(newLine);
        }

        if (currentCommand.trim()) {
            commandHistory.push(currentCommand);
            historyIndex = commandHistory.length;
        }

        currentCommand = '';
        currentLine = terminalContent.querySelector('#current-line');
        currentLine.focus();
        
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }

    function updateCurrentLine() {
        if (currentLine) {
            currentLine.textContent = currentCommand;
        }
    }

    function navigateHistory(direction) {
        if (commandHistory.length === 0) return;

        if (direction === 'up') {
            historyIndex = Math.max(0, historyIndex - 1);
        } else {
            historyIndex = Math.min(commandHistory.length, historyIndex + 1);
        }

        currentCommand = historyIndex < commandHistory.length ? commandHistory[historyIndex] : '';
        updateCurrentLine();
    }
});
