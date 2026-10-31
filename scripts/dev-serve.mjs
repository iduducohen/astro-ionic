import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const reading = spawn(process.execPath, ['server/reading.mjs'], { cwd: root, stdio: 'inherit' });

function stop(child) {
  if (child && !child.killed) child.kill();
}

const freed = spawn(process.execPath, ['scripts/free-port.js', '8100'], { cwd: root, stdio: 'inherit' });
freed.on('exit', (code) => {
  if (code !== 0) {
    stop(reading);
    process.exit(code ?? 1);
  }
  setTimeout(startApp, 400);
});

function startApp() {
  const ng = spawn('npx ng serve --port 8100 --proxy-config proxy.conf.json', {
    cwd: root,
    stdio: 'inherit',
    shell: true,
  });
  const shutdown = () => {
    stop(reading);
    stop(ng);
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
  ng.on('exit', (status) => {
    stop(reading);
    process.exit(status ?? 0);
  });
}
