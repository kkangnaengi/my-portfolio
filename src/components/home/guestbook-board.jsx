import { useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { useGuestbooks } from '../../hooks/use-guestbooks';
import { supabase } from '../../lib/supabase';
import { BOARD_FONT, RETRO_BUTTON_SX } from '../../utils/guestbook-style';
import GuestbookDetailDialog from './guestbook-detail-dialog';
import GuestbookMemo from './guestbook-memo';
import GuestbookWriteDialog from './guestbook-write-dialog';

/**
 * 방명록 칠판 (90년대 천리안 스타일) - 메모지가 여기저기 붙어 있고, 누르면 상세 보기
 *
 * Example usage:
 * <GuestbookBoard />
 */
export default function GuestbookBoard() {
  const { items, isLoading, errorMessage, reload } = useGuestbooks();
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleCreated = () => {
    setIsWriteOpen(false);
    reload();
  };

  const handleChanged = () => {
    setSelected(null);
    reload();
  };

  return (
    <Box
      sx={{
        mt: 4,
        p: { xs: 2, md: 3 },
        bgcolor: '#000070',
        color: '#e8ffff',
        border: '4px double #00ffff',
        fontFamily: BOARD_FONT,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.14) 0, rgba(0, 0, 0, 0.14) 1px, transparent 1px, transparent 3px)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ color: '#ffff55', fontWeight: 700, fontSize: { xs: '1.1rem', md: '1.4rem' } }}>★ 방명록 칠판 ★</Box>
          <Box sx={{ color: '#9fdfff', fontSize: '0.85rem', mt: 0.5 }}>
            ▶ 다녀간 흔적을 메모로 남겨 주세요! 메모를 누르면 전체 내용을 볼 수 있어요.
          </Box>
        </Box>
        <Button
          variant="contained"
          onClick={ () => setIsWriteOpen(true) }
          disabled={ !supabase }
          sx={{ ...RETRO_BUTTON_SX, bgcolor: '#00bbbb', color: '#000033', '&:hover': { bgcolor: '#33dddd' } }}
        >
          📌 메모 붙이기
        </Button>
      </Box>

      <Box
        sx={{
          mt: 3,
          py: 3,
          px: { xs: 1, md: 2 },
          minHeight: 220,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignContent: 'flex-start',
          gap: 3,
          border: '2px solid #3a7bd5',
          bgcolor: 'rgba(0, 0, 30, 0.45)',
        }}
      >
        { isLoading && <CircularProgress aria-label="방명록 불러오는 중" sx={{ color: '#00ffff', alignSelf: 'center' }} /> }
        { !isLoading && errorMessage && <Box sx={{ alignSelf: 'center', color: '#ff9b9b' }}>⚠ { errorMessage }</Box> }
        { !isLoading && !errorMessage && items.length === 0 && (
          <Box sx={{ alignSelf: 'center', textAlign: 'center', lineHeight: 1.8 }}>
            📭 칠판이 텅 비어 있어요.<br />첫 번째 메모의 주인공이 되어 보세요!
          </Box>
        ) }
        { items.map((memo) => <GuestbookMemo key={ memo.id } memo={ memo } onOpen={ setSelected } />) }
      </Box>

      <GuestbookWriteDialog isOpen={ isWriteOpen } onClose={ () => setIsWriteOpen(false) } onCreated={ handleCreated } />
      <GuestbookDetailDialog key={ selected?.id ?? 'none' } memo={ selected } onClose={ () => setSelected(null) } onChanged={ handleChanged } />
    </Box>
  );
}
