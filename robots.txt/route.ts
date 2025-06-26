export function GET() {
  const content = `
User-agent: *
Allow: /
Sitemap: https://poke-sight.vercel.app/sitemap.xml
  `.trim()

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}