import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * 방명록 메모 목록을 불러오는 훅 (최신 40개)
 * @returns {{ items: object[], isLoading: boolean, errorMessage: string|null, reload: function }}
 */
export function useGuestbooks() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const reload = useCallback(async () => {
    if (!supabase) {
      setErrorMessage('방명록 서버 설정이 없어서 지금은 열 수 없어요.');
      setIsLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('guestbooks')
      .select('id, nickname, content, pager_number, meeting_id, created_at, updated_at, meeting:meetings(title)')
      .order('created_at', { ascending: false })
      .limit(40);
    if (error) setErrorMessage('방명록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.');
    else {
      setItems(data ?? []);
      setErrorMessage(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reload();
  }, [reload]);

  return { items, isLoading, errorMessage, reload };
}
