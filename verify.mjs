import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const checks = [];

// Check imports in page.tsx
const page = readFileSync(join(__dirname, 'src/app/page.tsx'), 'utf8');
checks.push(['page.tsx has useState removed', !page.includes('useState')]);
checks.push(['page.tsx imports Hero', page.includes('import Hero')]);
checks.push(['page.tsx imports Divider', page.includes('import Divider')]);
checks.push(['page.tsx imports Contact', page.includes('import Contact')]);
checks.push(['page.tsx no grad-text', !page.includes('grad-text')]);
checks.push(['page.tsx no KONAMI', !page.includes('KONAMI')]);

// Check globals.css
const css = readFileSync(join(__dirname, 'src/app/globals.css'), 'utf8');
checks.push(['globals.css has --accent', css.includes('--accent:')]);
checks.push(['globals.css no --accent1', !css.includes('--accent1')]);
checks.push(['globals.css no neon cyan', !css.includes('#00f0ff')]);
checks.push(['globals.css no neon purple', !css.includes('#6366f1')]);

// Check icon.svg
const icon = readFileSync(join(__dirname, 'src/app/icon.svg'), 'utf8');
checks.push(['icon.svg no gradient', !icon.includes('linearGradient')]);
checks.push(['icon.svg has geometric mark', icon.includes('rotate')]);

// Check components
const hero = readFileSync(join(__dirname, 'src/app/components/Hero.tsx'), 'utf8');
checks.push(['Hero uses var(--bg)', hero.includes('bg-[var(--bg)]')]);

const divider = readFileSync(join(__dirname, 'src/app/components/Divider.tsx'), 'utf8');
checks.push(['Divider no mountain image', !divider.includes('mountain')]);
checks.push(['Divider uses var(--bg)', divider.includes('bg-[var(--bg)]')]);

const contact = readFileSync(join(__dirname, 'src/app/components/Contact.tsx'), 'utf8');
checks.push(['Contact uses var(--bg)', contact.includes('bg-[var(--bg)]')]);

// Run TypeScript check
try {
  execSync('npx tsc --noEmit', { stdio: 'inherit', cwd: __dirname });
  checks.push(['TypeScript check', true]);
} catch (e) {
  checks.push(['TypeScript check', false]);
}

console.log('\n=== VERIFICATION RESULTS ===');
for (const [name, pass] of checks) {
  console.log(`${pass ? '✓' : '✗'} ${name}`);
}
