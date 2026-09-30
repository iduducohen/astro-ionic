const { execSync } = require('node:child_process');

const port = process.argv[2];
if (!/^\d+$/.test(port || '')) {
  console.error('Usage: node scripts/free-port.js <port>');
  process.exit(1);
}

function listeningPids(target) {
  if (process.platform === 'win32') {
    const out = execSync('netstat -ano -p tcp', { encoding: 'utf8' });
    const ids = new Set();
    for (const line of out.split(/\r?\n/)) {
      const parts = line.trim().split(/\s+/);
      if (parts[0] !== 'TCP' || parts[3] !== 'LISTENING') continue;
      if (!parts[1]?.endsWith(`:${target}`)) continue;
      if (parts[4] && parts[4] !== '0') ids.add(parts[4]);
    }
    return [...ids];
  }
  try {
    return execSync(`lsof -ti tcp:${target}`, { encoding: 'utf8' })
      .split(/\s+/)
      .map((pid) => pid.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

const mine = String(process.pid);
for (const pid of listeningPids(port)) {
  if (pid === mine) continue;
  try {
    if (process.platform === 'win32') execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
    else process.kill(Number(pid), 'SIGKILL');
    console.log(`Freed port ${port} (pid ${pid})`);
  } catch {
    console.error(`Could not stop pid ${pid} on port ${port}`);
  }
}
