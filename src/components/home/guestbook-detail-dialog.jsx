import { useState } from 'react';
import {
  Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import { supabase } from '../../lib/supabase';
import { formatDateTime } from '../../utils/format-date-time';
import { BOARD_FONT, MEMO_DIALOG_PAPER_SX, RETRO_BUTTON_SX, getNoMeetingPhrase } from '../../utils/guestbook-style';
import PixelPager from './pixel-pager';

const NAVY_BUTTON_SX = { ...RETRO_BUTTON_SX, bgcolor: '#000070', color: '#ffffff', '&:hover': { bgcolor: '#1a1a9a' } };

/**
 * 방명록 메모 상세 창 (전체 내용 / 삐삐 픽셀아트 / 삐삐 알림 / 비밀번호로 수정·삭제)
 *
 * Props:
 * @param {object} memo - 선택된 방명록 데이터. null 이면 창이 닫힘 [Required]
 * @param {function} onClose - 창 닫기 [Required]
 * @param {function} onChanged - 수정/삭제 성공 후 실행할 함수 [Required]
 *
 * Example usage:
 * <GuestbookDetailDialog memo={ selected } onClose={ () => setSelected(null) } onChanged={ reload } />
 */
export default function GuestbookDetailDialog({ memo, onClose, onChanged }) {
  const [mode, setMode] = useState('view');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [isBusy, setIsBusy] = useState(false);

  const resetState = () => {
    setMode('view');
    setPassword('');
    setMessage(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const startEdit = () => {
    setContent(memo.content);
    setMessage(null);
    setMode('edit');
  };

  const run = async (request, onSuccess) => {
    setIsBusy(true);
    setMessage(null);
    const { error } = await request();
    setIsBusy(false);
    if (error) setMessage({ severity: 'error', text: error.message });
    else onSuccess();
  };

  const handleSendPager = () => run(
    () => supabase.rpc('send_guestbook_pager', { p_id: memo.id }),
    () => setMessage({ severity: 'success', text: '📟 삐삐 알림을 보냈어요! 삐삐~' }),
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    run(
      () => supabase.rpc('update_guestbook', { p_id: memo.id, p_password: password, p_content: content }),
      () => {
        resetState();
        onChanged();
      },
    );
  };

  const handleDelete = (e) => {
    e.preventDefault();
    run(
      () => supabase.rpc('delete_guestbook', { p_id: memo.id, p_password: password }),
      () => {
        resetState();
        onChanged();
      },
    );
  };

  if (!memo) return null;

  const isEdited = memo.updated_at && memo.updated_at !== memo.created_at;
  const passwordField = (
    <TextField
      size="small" type="password" label="비밀번호" required autoFocus value={ password }
      onChange={ (e) => setPassword(e.target.value) } sx={{ mt: 2 }} fullWidth
    />
  );

  return (
    <Dialog open onClose={ handleClose } fullWidth maxWidth="sm" slotProps={{ paper: { sx: MEMO_DIALOG_PAPER_SX } }}>
      <DialogTitle sx={{ fontWeight: 700, color: '#000070', pb: 0.5 }}>📌 { memo.nickname } 님의 메모</DialogTitle>
      <DialogContent>
        <Box sx={{ fontSize: '0.8rem', color: '#555555', mb: 1.5 }}>
          방명록 #{ memo.id } · { formatDateTime(memo.created_at) }{ isEdited ? ` (수정됨 ${formatDateTime(memo.updated_at)})` : '' }
        </Box>
        <Box sx={{ fontSize: '0.9rem', mb: 1.5, color: '#000070' }}>
          🏠 { memo.meeting?.title ?? getNoMeetingPhrase(memo.id) }
        </Box>

        { mode === 'edit' ? (
          <Box component="form" id="guestbook-edit-form" onSubmit={ handleUpdate }>
            <TextField
              label="내용 고치기" required multiline minRows={4} fullWidth value={ content }
              onChange={ (e) => setContent(e.target.value) } slotProps={{ htmlInput: { maxLength: 1000 } }}
            />
            { passwordField }
          </Box>
        ) : (
          <Box sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.7, minHeight: 80, fontFamily: BOARD_FONT }}>
            { memo.content }
          </Box>
        ) }

        { mode === 'delete' && (
          <Box component="form" id="guestbook-delete-form" onSubmit={ handleDelete }>
            <Box sx={{ mt: 2, color: '#b71c1c', fontWeight: 700 }}>정말 이 메모를 뗄까요? 비밀번호를 넣어 주세요.</Box>
            { passwordField }
          </Box>
        ) }

        { mode === 'view' && (
          <Box sx={{ mt: 2.5, pt: 2, borderTop: '1px dashed #555555', display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ width: { xs: '100%', sm: 220 } }}>
              <PixelPager number={ memo.pager_number } scale={ 4 } />
            </Box>
            <Box sx={{ flex: 1, minWidth: 160 }}>
              <Box sx={{ fontSize: '0.85rem', color: '#555555', mb: 1 }}>
                { memo.pager_number ? `삐삐번호 ${memo.pager_number}` : '삐삐번호를 안 남겼어요' }
              </Box>
              <Button size="small" variant="contained" disabled={ isBusy } onClick={ handleSendPager } sx={ NAVY_BUTTON_SX }>
                📟 삐삐 알림 보내기
              </Button>
            </Box>
          </Box>
        ) }

        { message && <Alert severity={ message.severity } sx={{ mt: 2 }}>{ message.text }</Alert> }
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, flexWrap: 'wrap' }}>
        { mode === 'view' && (
          <>
            <Button onClick={ startEdit } sx={{ ...RETRO_BUTTON_SX, color: '#000070' }}>✎ 고치기</Button>
            <Button onClick={ () => { setMessage(null); setMode('delete'); } } sx={{ ...RETRO_BUTTON_SX, color: '#b71c1c' }}>
              ✕ 떼기
            </Button>
            <Box sx={{ flex: 1 }} />
            <Button onClick={ handleClose } sx={ NAVY_BUTTON_SX } variant="contained">닫기</Button>
          </>
        ) }
        { mode === 'edit' && (
          <>
            <Button onClick={ resetState } sx={{ ...RETRO_BUTTON_SX, color: '#000070' }}>그만두기</Button>
            <Button type="submit" form="guestbook-edit-form" variant="contained" disabled={ isBusy } sx={ NAVY_BUTTON_SX }>
              저장하기 ▶
            </Button>
          </>
        ) }
        { mode === 'delete' && (
          <>
            <Button onClick={ resetState } sx={{ ...RETRO_BUTTON_SX, color: '#000070' }}>그만두기</Button>
            <Button
              type="submit" form="guestbook-delete-form" variant="contained" disabled={ isBusy }
              sx={{ ...RETRO_BUTTON_SX, bgcolor: '#b71c1c', color: '#ffffff', '&:hover': { bgcolor: '#d32f2f' } }}
            >
              메모 떼기 ▶
            </Button>
          </>
        ) }
      </DialogActions>
    </Dialog>
  );
}
