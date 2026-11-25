import { Box } from '@mui/material';
import { BOARD_FONT, getMemoLook } from '../../utils/guestbook-style';

/**
 * 칠판에 붙은 메모지 1장 (닉네임과 내용만 보여주고, 누르면 상세 보기)
 *
 * Props:
 * @param {object} memo - 방명록 데이터 (id, nickname, content) [Required]
 * @param {function} onOpen - 메모지를 눌렀을 때 실행할 함수 (memo 전달) [Required]
 *
 * Example usage:
 * <GuestbookMemo memo={ item } onOpen={ setSelected } />
 */
export default function GuestbookMemo({ memo, onOpen }) {
  const look = getMemoLook(memo.id);

  return (
    <Box
      component="button"
      type="button"
      onClick={ () => onOpen(memo) }
      aria-label={ `${memo.nickname} 님의 메모 열기` }
      sx={{
        position: 'relative',
        width: { xs: 'calc(50% - 12px)', sm: 168 },
        minHeight: 132,
        p: 1.5,
        pt: 2.5,
        border: 'none',
        bgcolor: look.color,
        color: '#222222',
        font: 'inherit',
        fontFamily: BOARD_FONT,
        textAlign: 'left',
        cursor: 'pointer',
        boxShadow: '3px 4px 0 rgba(0, 0, 0, 0.45)',
        transform: `translateY(${look.offsetY}px) rotate(${look.rotate}deg)`,
        transition: 'transform 0.15s ease',
        '&:hover, &:focus-visible': {
          transform: 'translateY(0) rotate(0deg) scale(1.08)',
          zIndex: 2,
        },
        '&:focus-visible': { outline: '3px solid #ffff55', outlineOffset: 2 },
      }}
    >
      <Box component="span" aria-hidden="true" sx={{ position: 'absolute', top: -8, left: '50%', ml: -1, fontSize: '1.1rem' }}>
        📌
      </Box>
      <Box
        sx={{
          fontWeight: 700,
          fontSize: '0.95rem',
          mb: 0.5,
          pb: 0.5,
          borderBottom: '1px dashed rgba(0, 0, 0, 0.45)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        { memo.nickname }
      </Box>
      <Box
        sx={{
          fontSize: '0.85rem',
          lineHeight: 1.5,
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 4,
          overflow: 'hidden',
        }}
      >
        { memo.content }
      </Box>
    </Box>
  );
}
