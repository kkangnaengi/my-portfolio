import { Box } from '@mui/material';

/** 3x5 픽셀 숫자 폰트 (1 = 켜진 픽셀) */
const GLYPHS = {
  '0': ['111', '101', '101', '101', '111'],
  '1': ['010', '110', '010', '010', '111'],
  '2': ['111', '001', '111', '100', '111'],
  '3': ['111', '001', '111', '001', '111'],
  '4': ['101', '101', '111', '001', '001'],
  '5': ['111', '100', '111', '001', '111'],
  '6': ['111', '100', '111', '101', '111'],
  '7': ['111', '001', '001', '001', '001'],
  '8': ['111', '101', '111', '101', '111'],
  '9': ['111', '101', '111', '001', '111'],
  '-': ['000', '000', '111', '000', '000'],
};

const GLYPH_WIDTH = 3;
const GLYPH_GAP = 1;
const LCD = { x: 6, y: 10, width: 52, height: 12 };

/** 번호 문자열을 켜진 픽셀 좌표 목록으로 변환 */
function buildPixels(chars) {
  const totalWidth = chars.length * (GLYPH_WIDTH + GLYPH_GAP) - GLYPH_GAP;
  const startX = LCD.x + Math.floor((LCD.width - totalWidth) / 2);
  const startY = LCD.y + Math.floor((LCD.height - 5) / 2);
  const pixels = [];
  chars.forEach((char, index) => {
    GLYPHS[char].forEach((row, y) => {
      [...row].forEach((bit, x) => {
        if (bit === '1') pixels.push({ x: startX + index * (GLYPH_WIDTH + GLYPH_GAP) + x, y: startY + y });
      });
    });
  });
  return pixels;
}

/**
 * 삐삐 모양 픽셀아트 (액정에 삐삐번호 표시)
 *
 * Props:
 * @param {string} number - 삐삐번호 (숫자와 - 만 표시, 최대 11자) [Optional, 기본값: null → ----]
 * @param {number} scale - 픽셀 하나의 크기(px) [Optional, 기본값: 5]
 *
 * Example usage:
 * <PixelPager number="012-3456" scale={5} />
 */
export default function PixelPager({ number = null, scale = 5 }) {
  const chars = (number ?? '').replace(/[^0-9-]/g, '').slice(0, 11).split('').filter(Boolean);
  const pixels = buildPixels(chars.length > 0 ? chars : ['-', '-', '-', '-']);
  const label = chars.length > 0 ? `삐삐번호 ${chars.join('')}` : '삐삐번호 없음';

  return (
    <Box
      component="svg"
      role="img"
      aria-label={ label }
      viewBox="0 0 64 40"
      width={ 64 * scale }
      height={ 40 * scale }
      shapeRendering="crispEdges"
      sx={{
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        '@keyframes pagerBlink': { '0%, 85%': { opacity: 1 }, '86%, 100%': { opacity: 0.35 } },
        '& .pager-digits': { animation: 'pagerBlink 2.4s steps(1) infinite' },
        '@media (prefers-reduced-motion: reduce)': { '& .pager-digits': { animation: 'none' } },
      }}
    >
      <title>{ label }</title>
      {/* 벨트 클립 */}
      <rect x="24" y="0" width="16" height="4" fill="#6b6b6b" />
      <rect x="26" y="1" width="12" height="2" fill="#2b2b2b" />
      {/* 몸체 (모서리를 깎은 형태) */}
      <rect x="4" y="4" width="56" height="34" fill="#1d2060" />
      <rect x="2" y="6" width="60" height="30" fill="#1d2060" />
      <rect x="4" y="4" width="56" height="2" fill="#4650c8" />
      <rect x="2" y="6" width="2" height="28" fill="#4650c8" />
      <rect x="4" y="36" width="56" height="2" fill="#0b0d33" />
      <rect x="60" y="6" width="2" height="30" fill="#0b0d33" />
      {/* 액정 */}
      <rect x="5" y="9" width="54" height="14" fill="#0b0d33" />
      <rect x={ LCD.x } y={ LCD.y } width={ LCD.width } height={ LCD.height } fill="#a8d08d" />
      <g className="pager-digits" fill="#1b3a1b">
        { pixels.map((p) => <rect key={ `${p.x}-${p.y}` } x={ p.x } y={ p.y } width="1" height="1" />) }
      </g>
      {/* 버튼 */}
      <rect x="8" y="28" width="8" height="4" fill="#c0c0c0" />
      <rect x="20" y="28" width="8" height="4" fill="#c0c0c0" />
      <rect x="32" y="28" width="8" height="4" fill="#c0c0c0" />
      <rect x="8" y="31" width="8" height="1" fill="#7a7a7a" />
      <rect x="20" y="31" width="8" height="1" fill="#7a7a7a" />
      <rect x="32" y="31" width="8" height="1" fill="#7a7a7a" />
      {/* 스피커 */}
      <rect x="46" y="27" width="10" height="1" fill="#0b0d33" />
      <rect x="46" y="29" width="10" height="1" fill="#0b0d33" />
      <rect x="46" y="31" width="10" height="1" fill="#0b0d33" />
    </Box>
  );
}
