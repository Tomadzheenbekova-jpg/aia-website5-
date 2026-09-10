import 'server-only';
import { cache } from 'react';
import { defaultContent, normalizeContent } from './model';
export const getContent = cache(async () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return defaultContent;
  try {
    const response = await fetch(`${url}/rest/v1/aia_content?id=eq.1&select=data`, {
      headers: { apikey: key }, cache: 'no-store', signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error(`Content read: ${response.status}`);
    const rows = await response.json();
    return normalizeContent(rows[0]?.data);
  } catch (error) {
    console.error('CMS content unavailable', error instanceof Error ? error.message : 'Unknown error');
    return defaultContent;
  }
});
export async function getCategories() { return (await getContent()).categories; }
