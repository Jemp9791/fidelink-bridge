# Uso rápido

## 1) Instalar
```bash
npm install
cp .env.example .env
```

## 2) WhatsApp (sin API)
```bash
node src/index.js whatsapp --phone 1122334455 --text "Hola [Nombre], tu beneficio está listo."
```

## 3) Telegram (con bot)
```bash
# Completar TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID en .env
node src/index.js telegram --text "Recordatorio de prueba"
```

> Si ponés DEFAULT_WAPP_PHONE en `.env`, no necesitás `--phone` siempre.
