/**
 * Envía un mensaje por Telegram usando el Bot API.
 * @param {object} params
 * @param {string} params.token Bot token
 * @param {string|number} params.chatId Chat ID destino
 * @param {string} params.text Texto a enviar
 */
export async function sendTelegram({ token, chatId, text }) {
  if (!token || !chatId) throw new Error('Falta token o chatId para Telegram.');

  const url = `https://api.telegram.org/bot${encodeURIComponent(token)}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: String(chatId),
      text: text || '(mensaje vacío)',
      disable_web_page_preview: true,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    log.error('Telegram error:', data);
    throw new Error('No se pudo enviar el mensaje de Telegram. Verificá token/chatId.');
  }
  log.info('Telegram enviado ✅');
  return data;
}
