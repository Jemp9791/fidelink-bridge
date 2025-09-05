/**
 * Genera un enlace de WhatsApp listo para usar (sin API).
 * - Normaliza el teléfono a solo dígitos (sin + ni espacios).
 * - Codifica correctamente el texto.
 * - Si no hay número, abre selector de contacto con el texto cargado.
 */
export function buildWhatsAppLink({ phone = '', text = '' }) {
  const digits = String(phone || '').replace(/\D/g, '');
  const msg = encodeURIComponent(text || '');

  if (digits) return `https://wa.me/${digits}?text=${msg}`;
  return `https://api.whatsapp.com/send?text=${msg}`;
}
