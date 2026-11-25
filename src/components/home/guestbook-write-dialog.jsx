import { useEffect, useState } from 'react';
import {
  Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField,
} from '@mui/material';
import { supabase } from '../../lib/supabase';
import { MEMO_DIALOG_PAPER_SX, RETRO_BUTTON_SX } from '../../utils/guestbook-style';

const EMPTY_FORM = { nickname: '', meetingId: '', content: '', pager: '', password: '' };

/**
 * 방명록 메모지 쓰기 창 (로그인 없이 누구나 작성)
 *
 * Props:
 * @param {boolean} isOpen - 창 열림 여부 [Required]
 * @param {function} onClose - 창 닫기 [Required]
 * @param {function} onCreated - 작성 성공 후 실행할 함수 [Required]
 *
 * Example usage:
 * <GuestbookWriteDialog isOpen={ isOpen } onClose={ close } onCreated={ reload } />
 */
export default function GuestbookWriteDialog({ isOpen, onClose, onCreated }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [meetings, setMeetings] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    if (!isOpen || !supabase) return;
    supabase
      .from('meetings')
      .select('id, title')
      .order('meeting_date', { ascending: false })
      .limit(30)
      .then(({ data }) => setMeetings(data ?? []));
  }, [isOpen]);

  const handleChange = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setErrorMessage(null);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBusy(true);
    setErrorMessage(null);
    const { error } = await supabase.rpc('create_guestbook_anon', {
      p_nickname: form.nickname,
      p_meeting_id: form.meetingId === '' ? null : Number(form.meetingId),
      p_content: form.content,
      p_password: form.password,
      p_pager: form.pager.trim() === '' ? null : form.pager.trim(),
    });
    setIsBusy(false);
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    setForm(EMPTY_FORM);
    onCreated();
  };

  return (
    <Dialog
      open={ isOpen }
      onClose={ handleClose }
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { component: 'form', onSubmit: handleSubmit, sx: MEMO_DIALOG_PAPER_SX } }}
    >
      <DialogTitle sx={{ fontWeight: 700, color: '#000070' }}>📌 칠판에 메모 붙이기</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
          <TextField
            label="닉네임" required size="small" value={ form.nickname } onChange={ handleChange('nickname') }
            slotProps={{ htmlInput: { maxLength: 20 } }}
          />
          <TextField
            select size="small" label="관련 모임 (선택)" value={ form.meetingId } onChange={ handleChange('meetingId') }
          >
            <MenuItem value="">선택 안 함 (비밀~)</MenuItem>
            { meetings.map((m) => <MenuItem key={ m.id } value={ m.id }>{ m.title }</MenuItem>) }
          </TextField>
          <TextField
            label="남기고 싶은 말" required multiline minRows={4} value={ form.content } onChange={ handleChange('content') }
            helperText={ `${form.content.length} / 1000` } slotProps={{ htmlInput: { maxLength: 1000 } }}
          />
          <TextField
            size="small" label="삐삐번호 (선택)" value={ form.pager } onChange={ handleChange('pager') }
            helperText="숫자와 - 만 쓸 수 있어요. 적으면 메모에 삐삐 모양으로 표시돼요."
            slotProps={{ htmlInput: { maxLength: 20, inputMode: 'tel', pattern: '[0-9 \\-]*' } }}
          />
          <TextField
            size="small" type="password" label="비밀번호 (4자 이상)" required value={ form.password } onChange={ handleChange('password') }
            helperText="메모를 고치거나 지울 때 필요해요. 꼭 기억해 주세요!"
            slotProps={{ htmlInput: { minLength: 4 } }}
          />
          { errorMessage && <Alert severity="error">{ errorMessage }</Alert> }
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={ handleClose } sx={{ ...RETRO_BUTTON_SX, color: '#000070' }}>그만두기</Button>
        <Button
          type="submit" variant="contained" disabled={ isBusy }
          sx={{ ...RETRO_BUTTON_SX, bgcolor: '#000070', color: '#ffffff', '&:hover': { bgcolor: '#1a1a9a' } }}
        >
          { isBusy ? '붙이는 중...' : '메모 붙이기 ▶' }
        </Button>
      </DialogActions>
    </Dialog>
  );
}
