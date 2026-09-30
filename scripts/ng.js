const { spawn } = require('node:child_process');
const path = require('node:path');

const args = process.argv.slice(2).map((arg) => {
  if (arg === '--code-coverage') return '--coverage';
  return arg
    .replaceAll('ChromeHeadlessCI', 'ChromiumHeadless')
    .replaceAll('ChromeHeadless', 'ChromiumHeadless');
});

const ng = path.join(__dirname, '..', 'node_modules', '@angular', 'cli', 'bin', 'ng.js');
const child = spawn(process.execPath, [ng, ...args], { stdio: 'inherit' });
child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
