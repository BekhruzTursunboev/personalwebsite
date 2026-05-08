import { execSync } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const run = (cmd) => {
  try {
    const out = execSync(cmd, { cwd: __dirname, encoding: 'utf8' });
    console.log(out);
    return true;
  } catch (e) {
    console.error(e.stderr || e.message);
    return false;
  }
};

run('git add -A');
run('git commit -m "redesign: high-agency minimal aesthetic, warm gold accent, clean components"');
run('git push -u origin main');
