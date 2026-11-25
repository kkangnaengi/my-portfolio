import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** 환경변수가 없으면 null (방명록만 비활성화되고 사이트는 정상 동작) */
export const supabase = url && key
  ? createClient(url, key, { auth: { persistSession: false } })
  : null;
