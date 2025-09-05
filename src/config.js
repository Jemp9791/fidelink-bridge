import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '..', '.env');

if (fs.existsSync(envPath)) dotenv.config({ path: envPath });

export function getConfig() {
  const cfg = {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || '',
    DEFAULT_WAPP_PHONE: (process.env.DEFAULT_WAPP_PHONE || '').replace(/\D/g, ''),
  };

  return {
    ...cfg,
    hasTelegram: Boolean(cfg.TELEGRAM_BOT_TOKEN && cfg.TELEGRAM_CHAT_ID),
  };
}
