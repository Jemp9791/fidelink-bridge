// Linter simple para detectar TABs en .env y validar JSON básico
import fs from 'fs';

function checkEnv() {
  if (!fs.existsSync('.env')) return;
  const raw = fs.readFileSync('.env', 'utf8');
  if (raw.includes('\t')) {
    console.warn('⚠ .env contiene TABs. Reemplazalos por espacios simples.');
  }
}

function checkJSON() {
  const files = ['package.json'];
  for (const f of files) {
    try { JSON.parse(fs.readFileSync(f, 'utf8')); }
    catch (e) { console.error(`❌ ${f} inválido:`, e.message); process.exit(1); }
  }
}

checkEnv();
checkJSON();
console.log('Lint OK');
