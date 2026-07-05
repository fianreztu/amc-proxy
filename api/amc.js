export default async function handler(req, res) {
  try {
    // 1. Mengambil halaman web embed
    const response = await fetch('https://vileembeds.pages.dev/embed/amc-usa', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://vileembeds.pages.dev/'
      }
    });

    const html = await response.text();

    // 2. Mencari link m3u8 yang ada di dalam kode web tersebut
    const regex = /(https?:\/\/[^"'\s]+\.m3u8[^"'\s]*)/;
    const match = html.match(regex);

    if (match && match[0]) {
      const liveM3u8Url = match[0];
      
      // 3. Mengarahkan player secara otomatis ke link m3u8 terbaru beserta tokennya
      res.setHeader('Location', liveM3u8Url);
      return res.status(302).end();
    } else {
      return res.status(404).json({ error: 'Link m3u8 tidak ditemukan di dalam halaman web.' });
    }

  } catch (error) {
    return res.status(500).json({ error: 'Gagal mengambil token', details: error.message });
  }
}
