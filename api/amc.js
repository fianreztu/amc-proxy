 
export default async function handler(req, res) {
  // Ambil halaman embed
  const page = await fetch("https://vileembeds.pages.dev/embed/amc-usa");
  const html = await page.text();

  // Cari link m3u8 (regex sederhana)
  const match = html.match(/https.*\.m3u8[^"]+/);
  if (!match) {
    return res.status(500).send("Tidak menemukan link m3u8");
  }

  const m3u8Url = match[0];
  const m3u8Data = await fetch(m3u8Url).then(r => r.text());

  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  res.send(m3u8Data);
}
