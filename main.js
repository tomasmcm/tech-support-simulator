import 'xterm/css/xterm.css';
import { Terminal } from 'xterm';

// Initialize terminal
const term = new Terminal({
  fontSize: 14,
  fontFamily: 'monospace',
  cursorBlink: true,
  theme: {
    background: '#000000',
    foreground: '#00ff00'
  }
});

term.open(document.getElementById('terminal'));

// Matrix rain effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '0123456789ABCDEF';
const drops = [];
const fontSize = 14;
const columns = canvas.width / fontSize;

for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0F0';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

// Terminal functionality
term.writeln('ADVANCED SYSTEM DIAGNOSTIC INTERFACE v2.0.4');
term.writeln('----------------------------------------');
term.writeln('Type "help" for available commands\n');

term.prompt = () => {
  term.write('\r\n$ ');
};

let commandBuffer = '';

const commands = {
  help: () => {
    term.writeln('\r\nAvailable commands:');
    term.writeln('  scan     - Run system diagnostic');
    term.writeln('  analyze  - Network analysis');
    term.writeln('  fix      - Attempt system repair');
    term.writeln('  clear    - Clear screen');
    term.writeln('  help     - Show this help\n');
  },
  clear: () => {
    term.clear();
  }
};

term.prompt();

term.onKey(({ key, domEvent }) => {
  const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

  if (domEvent.keyCode === 13) {
    const command = commandBuffer.trim();
    if (command.length > 0) {
      term.writeln('');
      if (commands[command]) {
        commands[command]();
      } else {
        term.writeln(`Command not found: ${command}`);
      }
    }
    commandBuffer = '';
    term.prompt();
  } else if (domEvent.keyCode === 8) {
    if (commandBuffer.length > 0) {
      commandBuffer = commandBuffer.slice(0, -1);
      term.write('\b \b');
    }
  } else if (printable) {
    commandBuffer += key;
    term.write(key);
  }
});
