import logos from '@/lib/cms/logos.json';
// Original JPEG bytes encoded for transport through the text-only repository connector.
export async function GET(_request: Request, { params }: { params: { kind: string } }) {
  if (params.kind !== 'brand' && params.kind !== 'production') return new Response(null, { status: 404 });
  return new Response(Buffer.from(logos[params.kind], 'base64'), {
    headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=86400', 'X-Content-Type-Options': 'nosniff' },
  });
}
