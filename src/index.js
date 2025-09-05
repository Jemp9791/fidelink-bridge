import { getConfig } from './config.js';
import { log } from './utils/logger.js';
import { buildWhatsAppLink } from './adapters/whatsapp.js';
import { sendTelegram } from './adapters/telegram.js';

const cfg = getConfig();

function parseArgs() {
  const args = process.argv.slice(2);
  const result = { _: [] };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith('--')) {
      const key = a.replace(/^--/, '');
      const val = (i + 1 < args.length && !args[i + 1].startsWith('--')) ? args[++i] : true;
      result[key] = val;
    } else {
      result._.push(a);
    }
  }
  return result;
}

async function main() {
  const argv = parseArgs();
  const cmd = argv._[0];

  if (!cmd || argv.help) {
    console.log(`
Fidelink Bridge CLI
Uso:
  node src/index.js whatsapp --phone 1122334455 --text "Mensaje"
  node src/index.js telegram --text "Mensaje" [--chat 123] [--token ABC]
    `.trim());
    return;
  }

  if (cmd === 'whatsapp') {
    const phone = (argv.phone || cfg.DEFAULT_WAPP_PHONE || '').replace(/\D/g, '');
    const text = String(argv.text || '');
    if (!text) {
      log.warn('Sugerencia: pasá --text "tu mensaje".');
    }
    const url = buildWhatsAppLink({ phone, text });
    console.log('\nLINK DE WHATSAPP:\n' + url + '\n');
    return;
  }

  if (cmd === 'telegram') {
    const text = String(argv.text || '');
    if (!text) throw new Error('Falta --text para Telegram.');
    const chat = argv.chat || cfg.TELEGRAM_CHAT_ID;
    const token = argv.token || cfg.TELEGRAM_BOT_TOKEN;
    await sendTelegram({ token, chatId: chat, text });
    return;
  }

  throw new Error(`Comando desconocido: ${cmd}`);
}

main().catch(err => {
  log.error(err.message);
  process.exitCode = 1;
});
