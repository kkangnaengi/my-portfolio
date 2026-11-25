/**
 * ISO 날짜 문자열을 'YYYY.MM.DD HH:mm' 형태로 변환
 * @param {string} value - ISO 날짜 문자열
 * @returns {string}
 */
export function formatDateTime(value) {
  if (!value) return '';
  const d = new Date(value);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
