#!/usr/bin/env bash
set -euo pipefail

echo "✔ Node: $(node -v)"
echo "✔ NPM: $(npm -v)"

if [ -f ".env" ]; then
  echo "✔ .env presente"
else
  echo "ℹ No hay .env (solo necesario para Telegram)"
fi

echo "Todo ok."#!/usr/bin/env bash
set -euo pipefail

echo "✔ Node: $(node -v)"
echo "✔ NPM: $(npm -v)"

if [ -f ".env" ]; then
  echo "✔ .env presente"
else
  echo "ℹ No hay .env (solo necesario para Telegram)"
fi

echo "Todo ok."
